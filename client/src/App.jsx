import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { SignedInRoutes, SignedOutRoutes,SubscriptionPlan } from "./routes";
import "./App.css";

function App() {

  return (
    <>
      <SignedIn>
        <SubscriptionPlan/>
        {/* <SignedInRoutes /> */}
      </SignedIn>
      <SignedOut>
        <SignedOutRoutes />
      </SignedOut>
    </>
  );
}

export default App;
