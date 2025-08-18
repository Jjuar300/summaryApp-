import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { SignedInRoutes, SignedOutRoutes, SubscriptionPlan } from "./routes";
import "./App.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(import.meta.env.VITE_TEST_PUBLISH_KEY);

const options = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
  appearance: {
    theme: "stripe",
  },
};

function App() {
  const isSessionStatus = useSelector((state) => state.Stripe.status);
  const subscriptionId = useSelector((state) => state.Stripe.subscription_Id); 
  console.log('subscriptionId:', subscriptionId); 
  console.log("isSessionStatus:", isSessionStatus);
  

  return (
    <>
      <SignedIn>
        <Elements options={options} stripe={stripePromise}>
          {isSessionStatus ? <SignedInRoutes /> : <SubscriptionPlan />}
        </Elements>
      </SignedIn>
      <SignedOut>
        <SignedOutRoutes />
      </SignedOut>
    </>
  );
}

export default App;
