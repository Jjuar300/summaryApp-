import { Box } from "@mui/material";
import Notes from "../home/Notes";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { BlockNoteEditor } from "@blocknote/core";
import { useUser } from "@clerk/clerk-react";

import "./styles/note.css";

import "./styles/index.css";
import { useEffect, useMemo, useState } from "react";
import { fetchData, postData, updateData } from "../../utils";

export default function index() {
  const [initialContent, setInitialContent] = useState(0);
  const {user} = useUser()

  const editor = BlockNoteEditor.create({
    initialContent: initialContent,
  });

  const handleEditorChange = async (jsonBlock) => {
    // localStorage.setItem("editorContent", JSON.stringify(jsonBlock));
    //  console.log('JSONBlock', JSON.stringify(jsonBlock))
    await postData("/api/userNotes", { content: JSON.stringify(jsonBlock), userId: user?.id});
    await updateData('/api/userNotes', {content: JSON.stringify(jsonBlock), userId: user?.id })
  };


  const fetchUserNote = async () => {
    // const savedContent = localStorage.getItem('editorContent')
     
    const savedContent = await fetchData(`/api/userNotes/${user?.id}`);
    console.log("savedContent", savedContent?.content);
    if (savedContent) {
      const blocks = JSON.parse(savedContent?.content);
      return setInitialContent(blocks);
    }
  };

  useEffect(() => {
    fetchUserNote();
  },[]);


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
          onChange={() => handleEditorChange(editor.document)}
          theme={"light"}
          data-background-theming-css
        />
      </Box>
    </div>
  );
}
