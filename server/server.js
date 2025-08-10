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

      if (event.type === "checkout.session.completed") {
        const session = await STRIPE.checkout.sessions.retrieve(
          event.data.object.id,
          { expand: ["line_items"] }
        );
        const customer = await STRIPE.customers.retrieve(session?.customer);

        if (customer.email) {
          const isPayment = await TestPayment.findOne({
            email: customer.email,
          });
          console.log("isPayment:", isPayment);
          if (!isPayment) {
            const testPayment = await TestPayment.create({
              email: customer.email,
              name: customer.name,
              customerId: customer.id,
              hasAccess: true,
              priceId: session?.line_items?.data[0]?.price.id,
            });
            testPayment.save();
          }
        } else {
              throw new Error('No user found!')
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
app.use("/api", routes);

try {
  mongoose.connect(process.env.DEV_MONGODB || process.env.MONGO_DATABASE);
} catch (error) {
  console.log(`${error}: did not connect`);
}

app.listen(PORT, () => {
  console.log("SERVER RUNNING ON PORT: ", PORT);
});
