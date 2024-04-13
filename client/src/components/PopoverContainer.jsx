import {
    Box, 
    Button
} from '@mui/material'

export default function PopoverContainer({
    imageIcon, 
    text, 
}) {
  return (
 <>
 <Box
    sx={{
        position:'relative', 
        display:'flex', 
        left:'1rem', 
    }}
    >
        <img
        style={{width:'1.2rem'}}
        src={`${imageIcon}`}
        />
    <Button
        sx={{
            fontSize:'1rem', 
            color:'black', 
            width:'10rem',
            left:'-2rem',  
        }}
        >
            {text}
        </Button>
    </Box>
 </>
  )
}
