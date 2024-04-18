import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import {useMediaQuery} from '@mui/material'
import addcircle from './assets/addcircle.svg'

export default function index() {
  const isMobileScreen = useMediaQuery('(max-width:400px)');

  return (
    <>
    <Box
    sx={{
      position: 'absolute', 
      top:'8rem', 
      left:'-.2rem', 
      ':hover' : {
        cursor:'pointer', 
        background:'#fefefe', 
      }, 
      width:'10rem',
      padding:'.5rem',
      paddingRight: isMobileScreen ? '11.4rem' : '3rem',
      paddingLeft: '3rem', 
      transition:'background .2s ease-in-out',
      opacity: '.6', 
      fontSize:'1.2rem',
    }}
    >
      Browse space
    </Box>

    <Box
    sx={{
      position: 'absolute', 
      top:'12rem', 
      left:'-.2rem', 
      ':hover' : {
        cursor:'pointer', 
        background:'#fefefe', 
      }, 
      width:'10rem',
      padding:'.5rem',
      paddingRight: isMobileScreen ? '11.4rem' : '3rem',
      paddingLeft: '3rem', 
      transition:'background .2s ease-in-out',
      opacity: '.6', 
      fontSize:'1.2rem',
      display: 'flex', 
    }}
    >
     <Typography >Create space</Typography>
    
    <Box
    sx={{
      position:'relative', 
      left:'13rem', 
    }}
    >
    <img
     src={`${addcircle}`}
     />
    </Box>

    </Box>
    </>
  )
}
