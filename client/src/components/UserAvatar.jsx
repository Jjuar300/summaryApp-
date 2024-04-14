import React from 'react'
import Avatar from '@mui/material/Avatar';


export default function UserAvatar({
  Text, 
  submitOnClickFunction, 
  width,
  height, 
  fontSize, 
  left, 
  top,
}) {
  return (
    <>
     <Avatar
     sx={{
      ':hover' : {cursor:'pointer'}, 
      color:'white', 
      backgroundColor:'orange', 
      width: `${width}rem`, 
      height: `${height}rem`, 
      fontSize:`${fontSize}rem`, 
      left: `${left}rem`,
      top:`${top}rem`,
    }}
    onClick={submitOnClickFunction}
     >
      {`${Text}`}
     </Avatar>
    </>
  )
}
