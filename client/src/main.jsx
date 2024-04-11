import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {ClerkProvider} from '@clerk/clerk-react'

const PUBLISHIBLE_CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHIBLE_CLERK_KEY}>
    <App />
    </ClerkProvider>
  </React.StrictMode>,
)
