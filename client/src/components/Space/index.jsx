import { 
    Box, 
    Typography, 
} from "@mui/material"
import {useMediaQuery} from "@mui/material"

export default function index({
    setState, 
    text, 
    icon, 
    isIcon, 
    inlineStyle, 
}) {
  const isMobileScreen = useMediaQuery('(max-width:400px)');

  return (
    <Box
    onClick={() => setState(true)}
    sx={inlineStyle}
    >
      {text}

   { 
   
   isIcon ? 

   <Box
    sx={{
      position:'relative', 
      left: isMobileScreen ? '13rem' : '4rem', 
    }}
    >
    <img
     src={`${icon}`}
     />
    </Box>
  : null  
  }

    </Box>
  )
}
