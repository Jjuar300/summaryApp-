import {Box,  Button,  Typography } from "@mui/material";
import AccountProfile from '../home/AccountProfile'
import Actions from '../home/Actions'
import {
  EditorContent, 
  useEditor, 
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'; 

// import Document from '@tiptap/extension-document'; 
// import Paragraph from '@tiptap/extension-paragraph'; 
// import Text from "@tiptap/extension-text";
// import Link from "@tiptap/extension-link";
// import Bold from "@tiptap/extension-bold";
// import Underline from "@tiptap/extension-underline";
// import Italic from "@tiptap/extension-italic";
// import Strike from "@tiptap/extension-strike";
// import Code from "@tiptap/extension-code";
// import History from "@tiptap/extension-history";

import { useCallback } from "react";

export default function index() {
  
const editor = useEditor({
  extensions: [StarterKit], 
  content: '<h1>Hello world</h1>',
})


  // const editor = useEditor({
  //   extensions: [
  //     Document, 
  //     History, 
  //     Paragraph, 
  //     Text, 
  //     Link.configure({openOnClick: false}), 
  //     Bold, 
  //     Underline, 
  //     Italic, 
  //     Strike, 
  //     Code, 
  //   ], 
  // })

// const toggleBold = useCallback(() => {
//   editor.chain().focus().toggleBold().run(); 
// }, [editor]); 

  return (
    <div>
   
   <AccountProfile/>
   <Actions/>

   <EditorContent editor={editor} />
    <Button
    onClick={() => editor.chain().focus().toggleBold().run()}
    sx={{
      position:'absolute', 
      left:'34rem', 
    }}
    >Bold</Button>

    <Button
    onClick={() => editor.chain().focus().toggleStrike().run()}
      sx={{
        position:'absolute', 
        left:'40rem', 
      }}
    >
      Strike
    </Button>

    </div>
  )
}
