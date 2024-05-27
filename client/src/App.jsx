import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { SignedInRoutes, SignedOutRoutes } from "./routes";
import "./App.css";
import { useUser } from "@clerk/clerk-react";

function App() {
  const {user} = useUser(); 
  console.log('user id:',user?.id)
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
