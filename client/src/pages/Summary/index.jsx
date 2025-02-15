import { Box } from "@mui/material";
import Notes from "../home/Notes";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteEditor } from "@blocknote/core";

import "./styles/note.css";

import "./styles/index.css";
import { useEffect, useMemo, useState } from "react";
export default function index() {
  // const BlockNoteEditor = useCreateBlockNote({
  //   domAttributes: {
  //     block: { class: "hello-world" },
  //   },

  //   initialContent: [{ type: "paragraph", content: "" }],
  // });

  const [initialContent, setInitialContent] = useState(null);
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    const saveContent = localStorage.getItem("editorContent");

    if (saveContent) return setInitialContent(JSON.stringify(saveContent));
  }, []);

  // const blockEditor = useMemo(() => {

  //   if(!editor){
  //     const newEditor = BlockNoteEditor.create({
  //       initialContent: initialContent || undefined,
  //     });

  //     setEditor(newEditor);
  //   }

  // }, [initialContent]);

  useEffect(() => {
    if (!editor) {
      const newEditor = BlockNoteEditor.create({
        initialContent: initialContent || undefined,
      });

      setEditor(newEditor);
    }
  }, [initialContent]);

  const handleSave = async () => {
    if (editor) {
      const blocks = await editor.getAllBlocks();
      localStorage.setItem("editorContent", JSON.stringify(blocks));
      console.log("Content saved!");
    }
  };

  return (
    <div>
      <Box
        sx={{
          position: "absolute",
          backgroundColor: "#f4f4f4",
          height: "58rem",
          borderRadius: "1rem",
          width: "58rem",
          left: "17rem",
          top: ".5rem",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: "23rem",
            top: "2rem",
          }}
        >
          <Notes />
        </Box>

        <BlockNoteView
          editor={editor}
          theme={"light"}
          onChange={handleSave}
          data-background-theming-css
        />
      </Box>
    </div>
  );
}
