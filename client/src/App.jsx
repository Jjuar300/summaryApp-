import Routes from './routes'
import { SignOutButton, SignInButton } from '@clerk/clerk-react'

function App() {

  return (
    <>
    <SignOutButton>
      <button>Signout from clerk</button>
    </SignOutButton>
    <SignInButton/>
     <Routes/>
    </>
  )
}

export default App
