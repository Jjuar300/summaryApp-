import {
    Route, 
    Routes, 
    BrowserRouter,
} from 'react-router-dom'
import Home from '../../pages/home/Index'
import NotFound from '../../pages/NotFound/Index'
import LandingPage from '../../pages/LandingPage/index'

export default function index() {
 
  return (
   <>
   <BrowserRouter>
    <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='*' element={<NotFound/>} />
    </Routes>
   </BrowserRouter>
   </>
  )
}