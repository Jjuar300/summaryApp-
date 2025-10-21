import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config();
process.removeAllListeners("warning");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3004;
const app = express();
const routes = require("./routes");
const stripe = require("stripe");
const { UserPayment } = require("./Models");
const morgan = require("morgan");
const path = require("path");

const STRIPE = new stripe(process.env.STRIPE_SECRET_KEY);
const __dirname = path.resolve();

app.use(morgan("combined"));
console.log("production_client_url:", process.env.PRODUCTION_CLIENT_URL);
app.use(
  cors({
    origin: process.env.PRODUCTION_CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const sig = req.headers["stripe-signature"];
      const event = STRIPE.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      console.log("event received:", event?.type);

      if (event.type === "checkout.session.completed") {
        console.log("user checkout.session.completed");
        const session = await STRIPE.checkout.sessions.retrieve(
          event.data.object.id,
          { expand: ["line_items"] }
        );
        const customer = await STRIPE.customers.retrieve(session?.customer);
        const subscription = await STRIPE.subscriptions.retrieve(
          session?.subscription
        );
        console.log("customer:", customer);
        if (customer.email) {
          const isPayment = await UserPayment.findOne({
            email: customer.email,
          });
          if (!isPayment) {
            await UserPayment.create({
              email: customer.email,
              name: customer.name,
              customerId: customer.id,
              subscriptionId: subscription.id,
              hasAccess: true,
              priceId: session?.line_items?.data[0]?.price.id,
            });
            console.log("payment saved to mongoDB");
          } else {
            console.log("User already exists in payments");
          }
        } else {
          res.sendStatus(400);
          throw new Error("No user found!", error.message);
        }

        return res.sendStatus(200);
      }
    } catch (error) {
      console.log("webhook Error:", error.message);
      return res.sendStatus(400);
    }
  }
);

app.use(express.json());
app.use("/", routes);
app.delete("/deleteCustomer", async (req, res) => {
  const { userCustomerId } = req.body;
  console.log('userCustomerId:', userCustomerId)
   if(!userCustomerId) return console.log('userCustomerId not found!')
  const deleteCustomer = await stripe.customers.del('cus_THNByozP0TDGYx');
  res.status(200).json({ message: " customer cancelled successfully!", deleteCustomer });
});


/* I commented the code below for testing purposes
if I get any 404 errors refering to files or static
files, then it might be because i comment the code below, 
to fix that maybe just uncomment the code and see what happens. 
The purpose for the code below is for the express server those
static files to the frontend. 
*/

// app.use(express.static(path.join(__dirname, "client", "dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });

try {
  // mongoose.connect(process.env.DEV_MONGODB || process.env.MONGO_DATABASE);
  mongoose.connect(process.env.MONGO_DATABASE);
} catch (error) {
  console.log(`${error}: did not connect`);
}

app.listen(PORT, () => {
  console.log("SERVER RUNNING ON PORT: ", PORT);
});
