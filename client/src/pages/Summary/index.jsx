import { Box, Button, TextField } from "@mui/material";
import AccountProfile from "../home/AccountProfile";
import Actions from "../home/Actions";
import Notes from "../home/Notes";
import ChatGpt from '../home/ChatGpt/index'
import {useGetChatgpt} from "../../hooks";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";

import {
  bold,
  underline,
  strike,
  leftFormat,
  centerFormat,
  rightFormat,
  italic,
  bulletList,
  task,
} from "./assets";
import "./styles/index.css";
import { useTiptap } from "../../hooks";
import { useState, useEffect } from "react";

export default function index() {
const {chatgptData} = useGetChatgpt() 
const [content, setContent] = useState(); 


useEffect(() => {
const savedContent = localStorage.getItem('editorContent')

   if(savedContent){
  setContent(savedContent); 
 }
},[])

const realContent = localStorage.getItem('editorContent');

let contentResponse; 

 chatgptData?.map(({response}) => {
    contentResponse= response; 
  })

 console.log('content:', contentResponse)

  const handleOnclick = () => {
    editor.chain().focus().insertContent(content).run(); 
  }
  
  const handleOnChange = (e) => {
    setContent(e.target.value)
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "type something here...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      Heading.configure({
        levels: [1, 2, 3],
      }),

      Underline,
      TaskList,
      TaskItem,
    ],
    content: realContent, 
    onUpdate: ({editor}) => {
     const html = editor.getHTML(); 
     localStorage.setItem('editorContent', html); 
    }
  });

  return (
    <div>

      <Box
        sx={{
          position: "absolute",
          backgroundColor: "#F8F5FD",
          width: "16rem",
          height: "59.7rem",
          left: ".2rem",
          top: ".05rem",
          borderTopRightRadius:'1rem',
          borderBottomRightRadius:'1rem', 
        }}
      >
        <AccountProfile />
        <Actions />
      </Box>

      <Box
      sx={{
        // border:'1px solid red', 
        position:'absolute', 
        backgroundColor:'#FAF6FF',
         height:'58rem', 
         borderRadius:'1rem',
         width:'98.6rem',
         left:'17rem',   
      }}
      >

        <Button
        onClick={handleOnclick}
        >
          send content
        </Button>

       <TextField
        onChange={handleOnChange}
       />

       {content}

  <Box
  sx={{
    position:'absolute', 
    left:'23rem', 
    top:'2rem', 
  }}
  >
  <Notes />

  {/* <ChatGpt/> */}
  </Box>

<Box
  sx={{
    display: "flex",
    position: "absolute",
    top: "10rem",
    left: "24rem",
    backgroundColor: "#363636",
    width: "50rem",
    height: "3rem",
    borderRadius: 2,
  }}
>
  <Button
    onClick={() => editor.chain().focus().toggleBold().run()}
    sx={{
      // backgroundColor: "black",
      ":hover": { backgroundColor: "#2b2b2b" },
      // top: ".1rem",
    }}
  >
    <img style={{ width: "1.6rem" }} src={bold} />
  </Button>

  <Button
    onClick={() => editor.chain().focus().toggleItalic().run()}
    sx={{
      ":hover": { backgroundColor: "#2b2b2b" },
    }}
  >
    <img style={{ width: "1rem" }} src={italic} alt="" />
  </Button>

  <Button
    sx={{
      // backgroundColor: "black",
      ":hover": { backgroundColor: "#2b2b2b" },
      // left: "-1rem",
      // top: ".1rem",
    }}
    onClick={() => editor.chain().focus().toggleUnderline().run()}
  >
    <img style={{ width: "1rem" }} src={underline} />
  </Button>

  <Button
    onClick={() => editor.chain().focus().toggleStrike().run()}
    sx={{
      // backgroundColor: "black",
      ":hover": { backgroundColor: "#2b2b2b" },
      // left:'-2rem',
    }}
  >
    <img style={{ width: "1.5rem" }} src={strike} />
  </Button>

  <Button
    onClick={() => editor.chain().focus().setTextAlign("center").run()}
    sx={{
      ":hover": { backgroundColor: "#2b2b2b" },
    }}
  >
    <img style={{ width: "1rem" }} src={centerFormat} />
  </Button>

  <Button
    onClick={() => editor.chain().focus().setTextAlign("right").run()}
    sx={{
      ":hover": { backgroundColor: "#2b2b2b" },
    }}
  >
    <img style={{ width: "1.1rem" }} src={rightFormat} />
  </Button>

  <Button
    onClick={() => editor.chain().focus().setTextAlign("left").run()}
    sx={{
      ":hover": { backgroundColor: "#2b2b2b" },
    }}
  >
    <img style={{ width: ".9rem" }} src={leftFormat} />
  </Button>

  <Button
    onClick={() =>
      editor.chain().focus().toggleHeading({ level: 1 }).run()
    }
    sx={{
      color: "#e3e3e3",
      fontSize: "1rem",
      ":hover": { backgroundColor: "#2b2b2b" },
    }}
  >
    H1
  </Button>

  <Button
    onClick={() =>
      editor.chain().focus().toggleHeading({ level: 2 }).run()
    }
    sx={{
      color: "#e3e3e3",
      fontSize: "1rem",
      ":hover": { backgroundColor: "#2b2b2b" },
    }}
  >
    H2
  </Button>

  <Button
    onClick={() =>
      editor.chain().focus().toggleHeading({ level: 3 }).run()
    }
    sx={{
      color: "#e3e3e3",
      fontSize: "1rem",
      ":hover": { backgroundColor: "#2b2b2b" },
    }}
  >
    H3
  </Button>

  <Button
    onClick={() => editor.chain().focus().toggleBulletList().run()}
    sx={{
      ":hover": { backgroundColor: "#2b2b2b" },
    }}
  >
    <img style={{ width: "1rem" }} src={bulletList} />
  </Button>
 
  <Button
    onClick={() => editor.commands.toggleTaskList()}
    sx={{
      ":hover": { backgroundColor: "#2b2b2b" },
      left:'2rem', 
    }}
  >
    <img src={task} />
  </Button>

</Box>


    <EditorContent
  className="editor-content"
  style={{
    position: "absolute",
    width: "60rem",
    padding: "5rem",
    left: "15rem",
    top: "14rem",
    overflowY: "auto",
    height: "33rem",
    fontSize: "1.2rem",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    lineHeight:'2rem',
    // border:'1px solid purple', 
  }}
  editor={editor}
/>
 

<Box
  sx={{
    position: "absolute",
    // border:'1px solid green',
    left: "16rem",
    width: "67rem",
    height: "2.2rem",
    top: "55rem",
    filter: "blur(20px)",
    backgroundColor: "white",
    opacity: ".8",
  }}
/>

      </Box>

    </div>
  );
}
