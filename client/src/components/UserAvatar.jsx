import React from 'react'
import Avatar from '@mui/material/Avatar';

export default function UserAvatar({
  Text, 
  submitOnClickFunction, 
}) {
  return (
    <>
     <Avatar
     sx={{
      left:'1.5rem', 
      top:'1rem',
      ':hover' : {cursor:'pointer'}, 
      color:'black', 
      backgroundColor:'orange', 
    }}
    onClick={submitOnClickFunction}
     >
      {`${Text}`}
     </Avatar>
    </>
  )
}
