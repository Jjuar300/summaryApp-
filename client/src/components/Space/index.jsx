import { 
    Box, 
    Typography, 
} from "@mui/material"
import {useMediaQuery} from "@mui/material"

export default function index({
    text, 
    CreateSpaceIcon,
    isSpaceIcon, 
    leftSpaceIcon, 
    rightSpaceIcon,   
    isCreateSpaceIcon, 
    inlineStyle, 
    onClick,
}) {
  const isMobileScreen = useMediaQuery('(max-width:400px)');

  return (
    <Box
    onClick={onClick}
    sx={inlineStyle}
    >
     <Typography>
     {text}
     </Typography>

   { 
   
   isCreateSpaceIcon ? 

   <Box
    sx={{
      position:'relative', 
      left: isMobileScreen ? '13rem' : '4rem', 
    }}
    >
    <img
     src={`${CreateSpaceIcon}`}
     />

    </Box>
  : null  
  }

 {
  isSpaceIcon ? 
  <Box
  sx={{
    position:'relative', 
    left: isMobileScreen ? '13rem' : '4rem',  
    width:'2rem'
  }}
  >
  <img
   src={`${rightSpaceIcon}`}
   />

  </Box>
  : null
 }

    </Box>
  )
}
