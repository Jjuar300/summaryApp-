import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { SignedInRoutes, SignedOutRoutes, SubscriptionPlan } from "./routes";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

function App() {
  const isUserFreeTrial = false; 
  return (
    <>
      <BrowserRouter>
        <SignedIn>
          {isUserFreeTrial ? <SignedInRoutes/> : <SubscriptionPlan />}
        </SignedIn>
        <SignedOut>
          <SignedOutRoutes />
        </SignedOut>
      </BrowserRouter>
    </>
  );
}

export default App;
