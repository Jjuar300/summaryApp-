import bodyParser from "body-parser";
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
const sentry = require("@sentry/node");
const { nodeProfilingIntegration } = require("@sentry/profiling-node");

const STRIPE = new stripe(process.env.STRIPE_SECRET_KEY);
const __dirname = path.resolve();

sentry.setupExpressErrorHandler(app);
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.PRODUCTION_CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
try {
} catch (error) {}
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

      console.log("event:", event);
      console.log("webhookSecretId:", process.env.STRIPE_WEBHOOK_SECRET);
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

        if (customer.email) {
          const isPayment = await UserPayment.findOne({
            email: customer.email,
          });
          if (!isPayment) {
            const testPayment = await UserPayment.create({
              email: customer.email,
              name: customer.name,
              customerId: customer.id,
              subscriptionId: subscription.id,
              hasAccess: true,
              priceId: session?.line_items?.data[0]?.price.id,
            });
            testPayment.save();
          }
        } else {
          throw new Error("No user found!");
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

sentry.init({
  dsn: "https://fb3384e7c218f3e8c887add378bfe68a@o4510013303554048.ingest.us.sentry.io/4510013306241024",
  sendDefaultPii: true,
  
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("my first sentry error!");
});

try {
  mongoose.connect(process.env.DEV_MONGODB || process.env.MONGO_DATABASE);
} catch (error) {
  console.log(`${error}: did not connect`);
}

app.listen(PORT, () => {
  console.log("SERVER RUNNING ON PORT: ", PORT);
});
