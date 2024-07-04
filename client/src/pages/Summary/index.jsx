import {Box,  Button,  Typography } from "@mui/material";
import AccountProfile from '../home/AccountProfile'
import Actions from '../home/Actions'; 
import Notes from '../home/Notes'


import {
  EditorContent, 
  useEditor, 
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'; 
import Placeholder from '@tiptap/extension-placeholder'

import { bold } from "./assets";
import './styles/index.css'

export default function index() {
  
const editor = useEditor({
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder:'type something here...',
    }), 
  ], 
  //  content: "", 
})

  return (
    <div>
   
   <Notes/>

    <Box
    sx={{
      position:'sticky',
    }}
    >
    <AccountProfile/>
    <Actions/>
    </Box>

    <Box
    sx={{
     position:'absolute', 
     top:'8rem',
     left:'40rem', 
     backgroundColor:'black', 
     width:'23rem',
     height:'3rem', 
     border:'1px solid blue'  
    }}
    >

<Button
    onClick={() => editor.chain().focus().toggleBold().run()}
    sx={{
          backgroundColor:'black', 
        ":hover" : {backgroundColor:'#2b2b2b'}
    }}
    >
     <img src={bold} />

    </Button>

    <Button
    onClick={() => editor.chain().focus().toggleStrike().run()}
      sx={{
        backgroundColor:'black', 
        ":hover" : {backgroundColor:'#2b2b2b'}
      }}
    >
     strike
    </Button>

    </Box>


   {/* <Box
   sx={{
    position:'absolute', 
    width:'50rem',
    height:'43.3rem',  
    // border:'1px solid red', 
    left:'35rem', 
    overflowY: 'auto' 
  }}
   > */}
  
  <EditorContent 
  className="editor-content"
  style={{
    position:'absolute', 
    width:'60rem',  
    // border:'1px solid red', 
    left:'30rem', 
    overflowY: 'auto' ,
    height:'43.3rem',
    fontSize:'1.2rem', 
    msOverflowStyle:'none', 
    scrollbarWidth:'none'
  }}
   editor={editor} />
  
   {/* </Box> */}

    </div>
  )
}
