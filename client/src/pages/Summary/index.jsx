import { Box} from "@mui/material";
import Notes from "../home/Notes";
import { useGetChatgpt } from "../../hooks";
import { HoverIconExtension } from "../../Tiptap/Extensions";

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

  const contentStorage = localStorage.getItem('editorContent')

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

      <Box

        sx={{
          // border:'1px solid red',
          position: "absolute",
          backgroundColor: "#f4f4f4",
          height: "58rem",
          borderRadius: "1rem",
          width: "58rem",
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

        <EditorContent
          className="editor-content"
          editor={editor}
        />

      </Box>
    </div>
  );
}
