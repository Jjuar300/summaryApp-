import { SignedIn, SignedOut} from "@clerk/clerk-react";
import { SignedInRoutes, SignedOutRoutes, SubscriptionPlan } from "./routes";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { useClerk } from "@clerk/clerk-react";

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
  const {isSignedIn} = useClerk(); 
  const isSessionStatus = useSelector((state) => state.Stripe.status);
  console.log("isSessionStatus:", isSessionStatus);

  const userPaymentPlan = () => {
    if (isSessionStatus === "active") {
      return  <SignedInRoutes /> ; 
    } else if (isSessionStatus === "pending" || isSessionStatus === 'cancelled') {
      return  <SubscriptionPlan />;
    }
  };

  return (
    <>
      <BrowserRouter>
        <SignedIn >
          <Elements options={options} stripe={stripePromise}>
          {/* {isSessionStatus === 'active' ? <SignedInRoutes/> : <SubscriptionPlan/>} */}
          {userPaymentPlan()}
          {/* <SignedInRoutes/> */}
          </Elements>
        </SignedIn>
        <SignedOut>
          <SignedOutRoutes />
        </SignedOut>
      </BrowserRouter>
    </>
  );
}

export default App;
