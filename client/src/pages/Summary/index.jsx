import { Box, Button} from "@mui/material";
import AccountProfile from "../home/AccountProfile";
import Actions from "../home/Actions";
import Notes from "../home/Notes";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from '@tiptap/extension-text-align'
import Heading from '@tiptap/extension-heading'


import { bold } from "./assets";
import "./styles/index.css";

export default function index() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "type something here...",
      }),
      TextAlign.configure({
        types:['heading', 'paragraph'], 
      }), 

      Heading.configure({
        levels: [1,2,3], 
      })
      // content:'chatgpt response goes here!'
    ],
  });

  return (
    <div>
      <Notes />

      <Box
        sx={{
          position: "sticky",
        }}
      >
        <AccountProfile />
        <Actions />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "8rem",
          left: "40rem",
          backgroundColor: "black",
          width: "23rem",
          height: "3rem",
          border: "1px solid blue",
        }}
      >
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          sx={{
            backgroundColor: "black",
            ":hover": { backgroundColor: "#2b2b2b" },
          }}
        >
          <img src={bold} />
        </Button>

        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          sx={{
            backgroundColor: "black",
            ":hover": { backgroundColor: "#2b2b2b" },
          }}
        >
          strike
        </Button>

        <Button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        >
          center
        </Button>

       <Button
       onClick={() => editor.chain().focus().setTextAlign('right').run()}
       >
        right
       </Button>

       <Button
       onClick={() => editor.chain().focus().setTextAlign('left').run()}
       >
        left
       </Button>

       <Button
       onClick={() => editor.chain().focus().setHeading({level: 1}).run()}
       >
        H1
       </Button>

       <Button
       onClick={() => editor.chain().focus().setHeading({level: 2}).run()}
       >
        H2
       </Button>

       <Button
       onClick={() => editor.chain().focus().setHeading({level: 3}).run()}
       >
        H3
       </Button>

      </Box>



      <EditorContent
        className="editor-content"
        style={{
          position: "absolute",
          width: "60rem",
          // border:'1px solid red',
          padding:'5rem', 
          left: "30rem",
          overflowY: "auto",
          height: "30rem",
          fontSize: "1.2rem",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
        editor={editor}
      />

      <Box
      sx={{
        position:'absolute', 
        // border:'1px solid blue', 
        left:'30rem', 
        width:'70rem', 
        height:'2.2rem',
        top:'57.2rem',  
        filter:'blur(20px)', 
        backgroundColor:'white',
        opacity:'.8', 
      }}
      ></Box>

    </div>
  );
}
