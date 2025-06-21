import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { SignedInRoutes, SignedOutRoutes, SubscriptionPlan } from "./routes";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(import.meta.env.VITE_TEST_PUBLISH_KEY);

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
