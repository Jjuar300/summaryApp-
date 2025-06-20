import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { SignedInRoutes, SignedOutRoutes, SubscriptionPlan } from "./routes";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(
  "pk_live_51NF8hxKBWAiPiCSPtcoQCx48lHOJtJO2DPNIlVCm3oWWHLqM6UAhKHIJINBAYP8IoRBZiqIe5Q7tKEzP0MWiOkAY003QNuFgTR"
);

const options = {
  mode:'payment', 
  amount: 1099, 
  currency: 'usd', 
  appearance: {
    theme:'stripe', 
  }
}


function App() {
  const isUserFreeTrial = false; 
  return (
    <>
      <BrowserRouter>
        <SignedIn>
          <Elements options={options} stripe={stripePromise}>
            {isUserFreeTrial ? <SignedInRoutes/> : <SubscriptionPlan />}
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
