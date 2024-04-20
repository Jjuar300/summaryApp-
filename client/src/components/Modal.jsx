import { 
    Box, 
    Button,
    Typography, 
    Modal, 
} from "@mui/material"

export default function DeleteModal({
    isOpen,
    setOpen, 
    userDeleteFunction,   
    inlineStyle,
    textQuestion,
    textInformation,
    textLeftButton, 
    textRightButton,    
}) {
  return (
    <>
        <Modal
  open={isOpen}
  >
    <Box
    sx={inlineStyle}
    >
       <Typography
       sx={{
        position:'absolute', 
        left:'2rem',
        top:'2rem',  
        fontSize:'1.3rem', 
       }}
       >
       {textQuestion}
       </Typography>

       <Typography
       sx={{
        position:'absolute', 
        left:'2rem',
        top:'7rem',  
        fontSize:'1rem', 
        opacity:'.6'
       }}
       >
       {textInformation}
       </Typography>

       <Button
       onClick={userDeleteFunction}
       sx={{
        position:'absolute', 
        top:'15rem', 
        left:'17rem', 
        backgroundColor:'#f66e7a', 
        color:'white', 
        width:'6rem'
       }}
       >
        {textRightButton}
       </Button>

       <Button
       onClick={() => setOpen(false)}
       sx={{
        position:'absolute', 
        top:'15rem', 
        left:'12rem',
        color: 'black',  
       }}
       >
        {textLeftButton}
       </Button>
    </Box>
  </Modal>
    </>
  )
}
