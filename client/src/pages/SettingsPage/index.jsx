import { 
    UserAvatar, 
    NavBar, 
} from "../../components"
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { 
    Box,
    Divider,
    TextField,
    Typography, 
    Button,
    Modal, 

} from "@mui/material";
import {ActionButton} from "../../components";
import { 
    feedBack, 
    shieldCheck, 
} from "./assets";
import { useState } from "react";

export default function index() {
    const {user} = useUser(); 
    const FirstName = user.firstName.charAt(0).toUpperCase()
    const navigate = useNavigate(); 
    const [isOpen, setOpen] = useState(); 

    const handleUserDelete = () => {
        user?.delete()
        navigate('/')
    }

    return (
   <>
  <NavBar/>
  <UserAvatar
   top={3}
   width={6}
   height={6}
   fontSize={2}
   left={8}
   Text={FirstName}
   />
 
   <Box
   sx={{
    position:'absolute', 
    display:'flex', 
    flexDirection:'column', 
    gap:'1rem', 
    top:'17rem', 
    left:'2rem', 
   }}
   >

  <Box>
    <Typography>Email</Typography>
  <TextField
   disabled
   sx={{
    width:'18rem',
    border:'none'
   }}
   placeholder={`${user.emailAddresses}`}
   />
  </Box>

  <Box>
    <Typography>FullName</Typography>
  <TextField
   disabled
   sx={{
    width:'18rem'
   }}
   placeholder={`${user.fullName}`}
   />
  </Box>

<Divider
sx={{
    position:'absolute', 
    width:'25rem',
    left:'-2rem',
    top:'13rem'
}}
/>

<Box
sx={{
    position:'absolute', 
    top:'15rem',
    display:'flex', 
    flexDirection:'column', 
    
}}
>

<ActionButton
Icon={shieldCheck}
Text={'Terms & Privacy'}
/>

<ActionButton
Icon={feedBack}
Text={'Give us feedback'}
/>
</Box>

<Typography
onClick={() => setOpen(true)}
 sx={{
    position:'absolute', 
    top:'22rem',
    left:'1rem', 
    color: '#4c4e4d', 
    ":hover" : {
        cursor:'pointer', 
        color:'#252625',
    }  
 }}
 >Delete account</Typography>

   </Box>


  <Modal
  open={isOpen}
  >
    <Box
    sx={{
        position:'absolute', 
        backgroundColor:'white', 
        width:'25rem', 
        height:'23rem', 
        left:'50rem',
        top:'15rem', 
        borderRadius:'1rem', 
    }}
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
       onClick={handleUserDelete}
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
