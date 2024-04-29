
import {
  useMediaQuery, 
  Popover,
  Box,
} from '@mui/material'
import { Space } from '../../../components'
import SpaceModal from '../../../components/Modal'

import React, { 
  useEffect, 
  useState, 
 } from 'react'

import { 
  addcircle, 
  dragIndicator, 
  noteCards,
  edit,  
  deleteIcon, 
} from './assets'

import { 
  fetchData, 
  postData, 
} from '../../../utils'

import {PopoverContainer} from '../../../components'

export default function index() {
  const [isBrowserClicked, setBrowserClicked] = useState(false); 
  const [isSpaceClicked, setSpaceClicked] = useState(false)
  const [isOpenModal, setOpenModal] = useState(false)
  const [isRenameSpaceOpen, setRenameSpaceOpen] = useState(false)
  const [text, setText] = useState('')
  const [editText, setEditText] = useState('')
  const [spaces, setSpaces] = useState([])
  const isMobileScreen = useMediaQuery('(max-width:400px)');
  const [anchorEl, setAnchorEl] = useState(null); 
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
}; 

const handleClose = () => {
    setAnchorEl(null)
}

console.log(text)
console.log(spaces)

const handleButtonClicked = () => {
  setOpenModal(true)
}

const handleRenameSpace = () => {
  setRenameSpaceOpen(true)
}

const handleSpaceTextSubmit = async (e) => {
   e?.preventDefault(); 
   postData('http://localhost:3004/postspacetext', {text: text})
}

const handleEditSpaceText = async (e) => {
  e?.preventDefault(); 
  //updateData('http://localhost:3004/editspacetext', {text: editText})
}

useEffect(() => {
   fetchData(
    'http://localhost:3004/getspacetext', 
    setSpaces, 
  );
  },[]);

const handleCloseSave = () => {
  handleSpaceTextSubmit(); 
  setOpenModal(false);
  setText('');
}

const handleCloseEditSpace = () => {
  handleEditSpaceText(); 
  setRenameSpaceOpen(false); 
  setEditText(''); 
}

const handleChange = (e) => {
  setText(e.target.value);
}; 

const handleEditChange = (e) => {
  setEditText(e.target.value); 
}

const BrowseStyle = {
    display:'flex',  
    position: 'relative', 
    top: isMobileScreen ? '9rem' : '9rem', 
    left: isMobileScreen ? '-.6rem' : '-1.6rem', 
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
  left: isMobileScreen ?  '-.6rem' : '-.3rem', 
  ':hover' : {
    cursor:'pointer', 
    background:'#fefefe', 
  }, 
  width:'10rem',
  padding:'.5rem',
  paddingRight: isMobileScreen ? '11.4rem' : '3rem',
  paddingLeft: isMobileScreen ? '3rem' : '1.5rem', 
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
  paddingLeft: isMobileScreen ? '4rem' : '3rem' , 
  transition:'background .2s ease-in-out',
  opacity: '.8', 
  fontSize:'1.2rem',
  backgroundColor: isSpaceClicked ? '#fefefe' : 'null', 
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

 const renameButtonStyle = {
  color:'#747573',
  textTransform: 'none'
 }

 const deleteButonStyle = {
  color: '#ff6f82',
  textTransform: 'none'
 }

  return (
    <>
  
  <Popover
    open={open}
    anchorEl={anchorEl}
    onClose={handleClose}
    sx={{
      display:'flex', 
      flexDirection:'row', 
      left: isMobileScreen ? '-3rem' :'-4rem', 
      width:'22rem',
      textTransform: ''
    }}
  > 
 
 <PopoverContainer
  text={'Rename'}
  buttonStyle={renameButtonStyle}
  submitOnClick={handleRenameSpace}
  />
   <PopoverContainer
  text={'Delete'}
  buttonStyle={deleteButonStyle}
  />

  </Popover>

   <Space
   isIcon={false}
   setState={setBrowserClicked}
   text={'Browser space'}
   inlineStyle={BrowseStyle}
   />
  
     <Space
    onClick={handleButtonClicked}
    isCreateSpaceIcon={true}
    CreateSpaceIcon={addcircle}
    text={'Create space'}
    inlineStyle={createSpaceStyle}
    />

     <SpaceModal
     onClick={handleCloseSave}
     onChange={handleChange}
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

    <SpaceModal
     onClick={handleCloseEditSpace}
     onChange={handleEditChange}
     setOpen={setRenameSpaceOpen}
     textQuestion={'Edit Space'}
     textLeftButton={'Cancel'}
     textRightButton={'Save'}
     isInput={true}
     isOpen={isRenameSpaceOpen}
     inlineStyle={MobileSpaceModal}
     inputStyle={textFieldStyle}
     rightButtonStyle={rightButtonStyle}
     isText={true}
    />


       {spaces.map((data) => (
         <Space 
         key={data?.id}
         onClick={setSpaceClicked}
         text={data.Text} 
         inlineStyle={cloneSpaceStyle}
         isSpaceIcon={true}
         rightSpaceIcon={dragIndicator}
         leftSpaceIcon={noteCards}
         rightSpaceIconClick={handleClick}
         />
       ))} 
     
    </>
  )
}
