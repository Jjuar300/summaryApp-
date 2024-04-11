import { lazy } from "react";

const SignIn = lazy(() => import('./signIn'))
const SignUp = lazy(() => import('./signUp'))

export {
    SignIn,
    SignUp,  
}