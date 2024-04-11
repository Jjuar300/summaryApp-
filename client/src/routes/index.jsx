import {
    Route, 
    Routes, 
    BrowserRouter,
} from 'react-router-dom'
import { 
    SignIn, 
    SignUp, 
} from '../pages/Auth'
import Home from '../pages/home/Index'
import NotFound from '../pages/NotFound/Index'

export default function index() {
  return (
   <>
   <BrowserRouter>
    <Routes>
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/' element={<Home/>} />
        <Route path='*' element={<NotFound/>} />
    </Routes>
   </BrowserRouter>
   </>
  )
}
