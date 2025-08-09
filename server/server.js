require("dotenv").config();
process.removeAllListeners("warning");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3004;
const app = express();
const routes = require("./routes");
const stripe = require("stripe");
const { TestPayment } = require("./Models");

const STRIPE = new stripe(process.env.STRIPE_TEST_SECRET_KEY);

app.use(cors("*"));
app.use(express.urlencoded({ extended: false }));
try {
} catch (error) {}
app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const sig = req.headers["stripe-signature"];
      const event = STRIPE.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      console.log("event:", event.type);

      // if(event.type === 'customer.created'){
      //   const customer = await STRIPE.customers.retrive(event.data.object.id);
      //   console.log('Customer retrived:', customer);
      // }else if(event.type === 'customer.subscription.delete'){
      //   const subscription = await STRIPE.subscription.retrive(event.data.object.id)

      // }

      if (event.type === "checkout.session.completed") {
        const session = await STRIPE.checkout.sessions.retrieve(
          event.data.object.id,
          { expand: ["line_items"] }
        );
        console.log('session::', session)
        const customer = await STRIPE.customers.retrieve(session?.customer);
        // const customer = event.data.object;
        console.log("customer:", customer);
        // let testPayment = await TestPayment.findOne({email: customer.email})
        const testPayment = await TestPayment.create({
          email: customer.email,
          name: customer.name,
          customerId: customer.id,
          hasAccess: true, 
          priceId: session?.line_items?.data[0]?.price.id, 

        });
        testPayment.save();

        return res.sendStatus(200);
      }
    } catch (error) {
      console.log("webhook Error:", error.message);
      return res.sendStatus(400);
    }
  }
);

app.use(express.json());
app.use("/api", routes);

try {
  mongoose.connect(process.env.DEV_MONGODB || process.env.MONGO_DATABASE);
} catch (error) {
  console.log(`${error}: did not connect`);
}

app.listen(PORT, () => {
  console.log("SERVER RUNNING ON PORT: ", PORT);
});
