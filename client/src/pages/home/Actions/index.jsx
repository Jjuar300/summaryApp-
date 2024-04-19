import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import {useMediaQuery} from '@mui/material'
import addcircle from './assets/addcircle.svg'
import { Space } from '../../../components'

export default function index() {
  const isMobileScreen = useMediaQuery('(max-width:400px)');
  const [isBrowserClicked, setBrowserClicked] = useState(false); 
  const [isSpaceClicked, setSpaceClicked] = useState(false)

const [clonedComponent, setCLonedComponent] = useState([]); 

const handleButtonClicked = () => {
  const newIndex = clonedComponent.length + 1; 
  setCLonedComponent([...clonedComponent, <Space text={'hello'} key={newIndex} index={newIndex}/>])
}

  const BrowseStyle = {
    display:'flex',  
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
    backgroundColor: isBrowserClicked ? '#fefefe' : null, 
    borderRight: isBrowserClicked ? '3px solid gray' : null, 
  }

 const createSpaceStyle = {
  display:'flex',  
  position: 'absolute', 
  top:'13rem', 
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
  backgroundColor: isSpaceClicked ? '#fefefe' : null, 
  borderRight: isSpaceClicked ? '3px solid gray' : null, 
}

  return (
    <>
 <Button
 onClick={handleButtonClicked}
 >
  Clone
 </Button>
   {clonedComponent}

   <Space
   isIcon={false}
   setState={setBrowserClicked}
   text={'Browser space'}
   inlineStyle={BrowseStyle}
   />
  
    <Space
    isIcon={true}
    icon={addcircle}
    text={'Create space'}
    setState={setSpaceClicked}
    inlineStyle={createSpaceStyle}
    />
    </>
  )
}
