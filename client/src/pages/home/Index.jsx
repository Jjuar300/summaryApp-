import {
  Box, 
  Typography,  
} from '@mui/material'
import Actions from './Actions/index'
import AccountProfile from './AccountProfile/index'

export default function Index() {
  return (
   <>    

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

   </Box>
   </>
  )
}
