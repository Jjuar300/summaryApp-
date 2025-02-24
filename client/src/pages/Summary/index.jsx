import { Box } from "@mui/material";
import Notes from "../home/Notes";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { BlockNoteEditor } from "@blocknote/core";
import { useUser } from "@clerk/clerk-react";

import "./styles/note.css";

import "./styles/index.css";
import { useEffect, useState } from "react";
import { fetchData, postData, updateData } from "../../utils";

export default function index() {
  const [initialContent, setInitialContent] = useState(undefined);
  const [noteId, setNote] = useState([]);

  const { user } = useUser();

  const editor = BlockNoteEditor.create({
    initialContent: initialContent,
  });

  const handleEditorChange = async (jsonBlock) => {
    if (noteId == undefined) {
      /*
    I added setTimeout() to delay
    getting the noteId so it won't 
    duplicate documents in the note
    collection in mongodb. 
    */
      setTimeout(async () => {
        await getNoteUserId();
      }, 1000);
      await postData("/api/userNotes", {
        content: JSON.stringify(jsonBlock),
        userId: user?.id,
        isNoteId: noteId == undefined,
      });
    } else {
      await updateData("/api/updateUserNotes", {
        content: JSON.stringify(jsonBlock),
        userId: user?.id,
      });
    }
  };

  const fetchUserNote = async () => {
    const savedContent = await fetchData(`/api/userNotes/${user?.id}`);
    if (savedContent) {
      const blocks = JSON.parse(savedContent?.content);
      return setInitialContent(blocks);
    }
  };

  const getNoteUserId = async () => {
    const response = await fetchData(`/api/userNotes/${user?.id}`);
    setNote(response?._id);
  };

  useEffect(() => {
    getNoteUserId();
    fetchUserNote();
    handleEditorChange();
  }, [noteId]);

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
