import { Box, Button } from "@mui/material";
import AccountProfile from "../home/AccountProfile";
import Actions from "../home/Actions";
import Notes from "../home/Notes";

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

export default function index() {
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
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: "taskItem",
        },
      }),
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
          display: "flex",
          position: "absolute",
          top: "1rem",
          left: "42rem",
          backgroundColor: "#363636",
          width: "50rem",
          height: "3rem",
          // border: "1px solid blue",
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
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          sx={{
            ":hover": { backgroundColor: "#2b2b2b" },
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
          // border: "1px solid red",
          padding: "5rem",
          left: "30rem",
          top: "5rem",
          overflowY: "auto",
          height: "44rem",
          fontSize: "1.2rem",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
        editor={editor}
      />

      <Box
        sx={{
          position: "absolute",
          // border:'1px solid blue',
          left: "30rem",
          width: "70rem",
          height: "2.2rem",
          top: "57.2rem",
          filter: "blur(20px)",
          backgroundColor: "white",
          opacity: ".8",
        }}
      ></Box>
    </div>
  );
}
