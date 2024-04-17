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
        Are your sure you want to delete your<br/> Account?
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
        Deleting your account will remove all <br/>
        information and data.  
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
        Delete
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
        Cancel
       </Button>
    </Box>
  </Modal>
    </>
  )
}
