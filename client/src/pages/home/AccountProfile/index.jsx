import {
    Box, 
    Button, 
    Popover, 
  } from '@mui/material'
  import {
    UserAvatar, 
    PopoverContainer, 
  } from '../../../components'
  import {
    useUser, 
    SignOutButton, 
} from '@clerk/clerk-react'
import { useState } from 'react';
import {
    settings, 
    feedBack, 
    logout, 
} from './assets'

import {useNavigate} from 'react-router-dom'

  export default function Index() {

    const {user} = useUser(); 
    const FirstName = user.firstName.charAt(0).toUpperCase()
    const [anchorEl, setAnchorEl] = useState(null); 
    const navigate = useNavigate(); 

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }; 

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const userAvatarStyle = {
      position:'relative', 
      backgroundColor:'orange', 
      top:'2rem', 
      left:'2rem', 
      width:'3rem',
      height:'3rem',
      fontSize:'1.4rem',   
    } 

    return (
     <>      
      <UserAvatar
      
      Text={FirstName}
      submitOnClickFunction={handleClick}
      inlineStyle={userAvatarStyle}
      />
      <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      sx={{
        left:'4rem', 
        width:'12rem', 
      }}
      >
      <Box
      sx={{
        display:'flex', 
        flexDirection:'column', 
        alignItems:'flex-start',  
        width:'12rem', 
        gap:'1rem', 
      }}
      >

       <PopoverContainer
       imageIcon={settings}
       text={'Settings'}
       submitOnClick={() => navigate('/settings')}
       />

       <PopoverContainer
       imageIcon={feedBack}
       text={'Feedback'}
       />

      <SignOutButton>
      <Box
    sx={{
        position:'relative', 
        display:'flex', 
        left:'1rem', 

    }}
    >
        <img
        style={{width:'1.2rem'}}
        src={`${logout}`}
        />
    <Button
        sx={{
            fontSize:'1rem', 
            color:'black',
            width:'10rem',
            left:'-2rem',  
        }}
        >
            Logout
        </Button>
    </Box>
      </SignOutButton>
     
      </Box>
      </Popover>
     </>
    )
  }