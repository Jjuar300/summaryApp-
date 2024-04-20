import { 
    Box, 
    Button,
    Typography, 
    Modal,
    TextField, 
} from "@mui/material"

export default function DeleteModal({
    isOpen,
    setOpen, 
    onClick,   
    inlineStyle,
    textQuestion,
    textInformation,
    textLeftButton, 
    textRightButton,    
    isText, 
    isInput, 
    inputStyle, 
    rightButtonStyle, 
}) {
  return (
    <>
        <Modal
  open={isOpen}
  >
    <Box
    sx={inlineStyle}
    >
      {
      isText 
      ?
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
      : 
      null 
      }

     {  
     isText 
     ? 
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
       : 
       null
       }

      {
        isInput 
        ?
        <TextField
         sx={inputStyle}
        />
      : 
      null
    }

       <Button
       onClick={onClick}
       sx={rightButtonStyle}
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
