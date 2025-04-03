import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { SignedInRoutes, SignedOutRoutes } from "./routes";
import "./App.css";

function App() {

  return (
    <>
      <SignedIn>
        <SignedInRoutes />
      </SignedIn>
      <SignedOut>
        <SignedOutRoutes />
      </SignedOut>
    </>
  );
}

export default App;
