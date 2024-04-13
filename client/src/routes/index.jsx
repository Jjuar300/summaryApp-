import {
    Route, 
    Routes, 
    BrowserRouter,
} from 'react-router-dom'
import {
  SignedIn, 
  SignedOut, 
} from '@clerk/clerk-react'
import Home from '../pages/home/Index'
import NotFound from '../pages/NotFound/Index'
import LandingPage from '../pages/LandingPage/index'
import {useNavigate} from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'

export default function index() {
  const navigate = useNavigate(); 
  const {user} = useUser()

useEffect(() => {
  if(user){
    navigate('/')
   }else{
    navigate('/landing')
   }
}, [user])

  return (
   <>
   <BrowserRouter>
    <Routes>
        <Route path='/landing' element={<LandingPage/>} />
        <Route path='/' element={<Home/>} />
        <Route path='*' element={<NotFound/>} />
    </Routes>
   </BrowserRouter>
   </>
  )
}
