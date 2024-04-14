import { UserAvatar } from "../../components"
import { useUser } from "@clerk/clerk-react";
import { NavBar } from "../../components";
import { useNavigate } from "react-router-dom";
import { 
    Box,
    Divider,
    TextField,
    Typography, 
    Button,

} from "@mui/material";
import {ActionButton} from "../../components";

export default function index() {
    const {user} = useUser(); 
    const FirstName = user.firstName.charAt(0).toUpperCase()
    const navigate = useNavigate(); 

    const handleUserDelete = () => {
        user?.delete()
        navigate('/')
    }

    return (
   <>
   <NavBar
   submitClickFunction={() => navigate('/')}
   />
 
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
    width:'18rem'
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
Text={'Announcement'}
/>

<ActionButton
Text={'Terms & Privacy'}
/>

<ActionButton
Text={'Give us feedback'}
/>
</Box>

<Divider
sx={{
    position:'absolute', 
    width:'25rem',
    left:'-2rem',
    top:'25rem'
}}
/>

<Button
onClick={handleUserDelete}
sx={{
    backgroundColor:'#830e0a', 
    position:'absolute', 
    top:'28rem',
    left:'6rem',
    color:'white',
    ":hover" : {backgroundColor:'#590907'} 
}}
>
    Delete Account
</Button>
   </Box>


   </>
  )
}
