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
    useMediaQuery

} from "@mui/material";
import {ActionButton} from "../../components";
import { 
    feedBack, 
    shieldCheck, 
} from "./assets";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

export default function index() {
    const {user} = useUser(); 
    const FirstName = user.firstName.charAt(0).toUpperCase()
    const navigate = useNavigate(); 
    const [isOpen, setOpen] = useState(); 
    const isMobileScreen = useMediaQuery('(max-width:400px)');


    const DesktopDeleteAccountModal = {
      position:'absolute', 
      backgroundColor:'white', 
      width:'25rem', 
      height:'23rem', 
      left:'50rem',
      top:'15rem', 
      borderRadius:'1rem', 
    }

   const MobileDeleteAccountModal = {
      position:'absolute', 
      backgroundColor:'white', 
      width:'25rem', 
      height:'23rem', 
      top:'10rem', 
      borderRadius:'1rem', 
   }

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
{ 
isMobileScreen ?
<DeleteModal
  isOpen={isOpen}
  setOpen={setOpen}
  userDeleteFunction={handleUserDelete}
  inlineStyle={MobileDeleteAccountModal}
   />
  :
  
  <DeleteModal
  isOpen={isOpen}
  setOpen={setOpen}
  userDeleteFunction={handleUserDelete}
  inlineStyle={DesktopDeleteAccountModal}
   />
  }
   </>
  )
}
