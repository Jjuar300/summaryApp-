import { 
  SignedIn, 
  SignedOut,
 
} from '@clerk/clerk-react'
import {
  SignedInRoutes, 
  SignedOutRoutes, 
} from './routes'

function App() {

  return (
    <>
    <SignedIn>
      <SignedInRoutes/>
    </SignedIn>
     <SignedOut>
     <SignedOutRoutes/>
     </SignedOut>
    </>
  )
}

export default App
