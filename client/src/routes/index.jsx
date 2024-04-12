import {
    Route, 
    Routes, 
    BrowserRouter,
} from 'react-router-dom'

import Home from '../pages/home/Index'
import NotFound from '../pages/NotFound/Index'

export default function index() {
  return (
   <>
   <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='*' element={<NotFound/>} />
    </Routes>
   </BrowserRouter>
   </>
  )
}
