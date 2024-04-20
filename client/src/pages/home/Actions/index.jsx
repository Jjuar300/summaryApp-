import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import {useMediaQuery} from '@mui/material'
import addcircle from './assets/addcircle.svg'
import { Space } from '../../../components'
import SpaceModal from '../../../components/Modal'

export default function index() {
  const isMobileScreen = useMediaQuery('(max-width:400px)');
  const [isBrowserClicked, setBrowserClicked] = useState(false); 
  const [isSpaceClicked, setSpaceClicked] = useState(false)
  const [isOpenModal, setOpenModal] = useState(false)

const [clonedComponent, setCLonedComponent] = useState([]); 

const handleButtonClicked = () => {
  const newIndex = clonedComponent.length + 1; 
  setCLonedComponent([...clonedComponent, 
  <Space 
  setState={setSpaceClicked}
  text={'hello'} 
  inlineStyle={cloneSpaceStyle}
  key={newIndex} 
  index={newIndex}/>])
  setSpaceClicked(true)
  setOpenModal(true)
  
}

  const BrowseStyle = {
    display:'flex',  
    position: 'relative', 
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
  position: 'relative', 
  top:'10rem', 
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
}

const cloneSpaceStyle = {
  display:'flex',  
  position: 'relative', 
  top:'10rem', 
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


const MobileSpaceModal = {
  position:'absolute', 
  backgroundColor:'white', 
  width:'25rem', 
  height:'23rem', 
  top:'10rem', 
  borderRadius:'1rem', 
}


const textFieldStyle = {
  position:'absolute', 
  top:'6rem', 
  left:'2rem', 
  width:'20rem', 
}

const rightButtonStyle = {
  position:'absolute', 
  top:'15rem', 
  left:'17rem', 
  backgroundColor:'#47046e', 
  color:'white', 
  width:'6rem'
 }
  return (
    <>

   <Space
   isIcon={false}
   setState={setBrowserClicked}
   text={'Browser space'}
   inlineStyle={BrowseStyle}
   />
  
    <Space
    onClick={handleButtonClicked}
    isIcon={true}
    icon={addcircle}
    text={'Create space'}
    inlineStyle={createSpaceStyle}
    />

     <SpaceModal
     rightButtonStyle={rightButtonStyle}
     textQuestion={'Create a new Space'}
     isText={true}
     inputStyle={textFieldStyle}
     isInput={true}
     isOpen={isOpenModal}
     textLeftButton={'Cancel'}
     textRightButton={'Save'}
     setOpen={setOpenModal}
     inlineStyle={MobileSpaceModal}
     />

    </>
  )
}
