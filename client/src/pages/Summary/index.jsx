import { Box, Button, TextField } from "@mui/material";
import AccountProfile from "../home/AccountProfile";
import Actions from "../home/Actions";
import Notes from "../home/Notes";
import ChatGpt from "../home/ChatGpt/index";
import { useGetChatgpt } from "../../hooks";

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
import { useState, useEffect } from "react";
import { fetchData, postData, updateData } from "../../utils";

export default function index({content}) {
  const { chatgptData } = useGetChatgpt();

  const contentResponse = chatgptData?.map(({ response }) => {
    return response;
  }).join('')

  console.log("content:", contentResponse);

  const contentStorage = localStorage.getItem('editorContent')

 console.log('contentStorage:', contentStorage)

 const updateEditorContent = async (html) => {
     try{
        await updateData(`/api/chatgpt/66b18197d2bb2629fa788217`, {
          html: html, 
        })
     }catch(error){
      console.log('error:',error)
     }
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

    // content: 'djdjdj', 
    onUpdate: ({ editor }) => {
      const html = editor?.getHTML(); 
        updateEditorContent(html)
    },
  });

 const handleOnclick = () => {
   const formatted = chatgptData?.map(data => `<p>${data?.response}</p>`).join(''); 
   editor.commands.setContent(formatted) 
  }

  return (
    <div>
      {/* <Box
        sx={{
          position: "absolute",
          backgroundColor: "#F8F5FD",
          width: "16rem",
          height: "59.7rem",
          left: ".2rem",
          top: ".05rem",
          borderTopRightRadius: "1rem",
          borderBottomRightRadius: "1rem",
        }}
      >
        <AccountProfile />
        <Actions />
      </Box> */}

      <Box

        sx={{
          // border:'1px solid red',
          position: "absolute",
          backgroundColor: "#f4f4f4",
          height: "58rem",
          borderRadius: "1rem",
          width: "60rem",
          left: "17rem",
          top: ".5rem",
        }}
      >
        {/* <Button
        onClick={handleOnclick}
        >sendChagpt</Button> */}

        <Box
          sx={{
            position: "absolute",
            left: "23rem",
            top: "2rem",
          }}
        >
          <Notes />

        </Box>

        {/* <Box
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
              left: "2rem",
            }}
          >
            <img src={task} />
          </Button>
        </Box> */}

        <EditorContent
          className="editor-content"
          style={{
            position: "absolute",
            width: "60rem",
            padding: "5rem",
            left: "6rem",
            top: "14rem",
            overflowY: "auto",
            height: "33rem",
            fontSize: "1.2rem",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            lineHeight: "2rem",
            // border:'1px solid purple',
          }}
          editor={editor}
        />

      </Box>
    </div>
  );
}
