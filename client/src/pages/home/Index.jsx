import verticalLineSvg from './assets/verticalLine.svg'
import {
  Box, 
  Typography, 
} from '@mui/material'
import Avatar from '@mui/material/Avatar';

export default function Index() {
  return (
   <>
   <Box
   sx={{ 
    position:'absolute', 
    backgroundColor:'#f2f3f4',
    width:'16rem', 
    height:'58rem', 
    left:'.2rem', 
    top:'.05rem', 
    // borderRight:'solid #c1c6c8'
  }}
   >
     <Avatar
     sx={{
      left:'1.5rem', 
      top:'1rem',
      ':hover' : {cursor:'pointer'},  
    }}
     />
   </Box>
   {/* <img
   style={{
    position:'absolute', 
    left:'15rem', 
    width:'1rem',
    opacity:'.6',
    height:'50rem', 
    top:'2rem',   
   }}
   src={`${verticalLineSvg}`}
   /> */}
   </>
  )
}
