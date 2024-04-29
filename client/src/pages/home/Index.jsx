import {
  Box, 
  Typography,
  useMediaQuery,  
  Drawer,  
  Button,  
} from '@mui/material'
import Actions from './Actions/index'
import AccountProfile from './AccountProfile/index'
import ExitArrow from './assets/ExitArrow.svg'
import { useState } from 'react';

export default function Index() {
  const isMobileScreen = useMediaQuery('(max-width:400px)');
  const [open, setOpen] = useState(false)

  return (
   <>    
{
  isMobileScreen ? 

  <>
    <Drawer 
  open={open}
  >
   <Box
   sx={{
     width:'25rem'
   }}
   >
   <AccountProfile/>
  <Actions/>
  <Button
  onClick={() => setOpen(false)}
  sx={{
    position:'absolute', 
    left:'18rem',
    top:'1rem',
    opacity:'.4'  
  }}
  >
  <img
  src={`${ExitArrow}`}
  />
  </Button>
   </Box>
   </Drawer>

   <Button
  onClick={() => setOpen(true)}
  sx={{
    position:'absolute', 
    left:'1rem',
    top:'1rem',
    opacity:'.4', 
    transform:'rotate(.5turn)'
  }}
  >
  <img
  src={`${ExitArrow}`}
  />
  </Button>

  </>  

  :
   <Box
   sx={{ 
    position:'absolute', 
    backgroundColor:'#f2f3f4',
    width:'16rem', 
    height:'59.8rem', 
    left:'.2rem', 
    top:'.05rem', 
  }}
   >
 <AccountProfile/>
   <Actions/>
   </Box>}

  
   </>
  )
}
