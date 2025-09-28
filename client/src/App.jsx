import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { SignedInRoutes, SignedOutRoutes, SubscriptionPlan } from "./routes";
import "./App.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { useUserPayment } from "./hooks";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "./utils";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);

const options = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
  appearance: {
    theme: "stripe",
  },
};

function App() {
  const {getSubscriptionPlan} = useUserPayment();
  const {user, isSignedIn} = useUser(); 
  const isSessionStatus = useSelector((state) => state.Stripe.status);
  const navigate = useNavigate(); 
 const createUser = async () => {
    await postData("/api/users", {
      email: user?.primaryEmailAddress.emailAddress,
      userId: user?.id,
    });
  };

  if(!isSignedIn){
    navigate('/Noto')
  } 
  
  useEffect(() => {
    if(user?.id){
      getSubscriptionPlan(); 
      createUser(); 
    }
  },[])

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
