import { Box, useMediaQuery } from "@mui/material";
import Notes from "../home/Notes";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { BlockNoteEditor } from "@blocknote/core";

import "./styles/note.css";

import "./styles/index.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useUserNote } from "../../hooks";

export default function Index() {
  const { initialContent, fetchUserNote, handleEditorChange } = useUserNote();
  const spaceId = useSelector((state) => state.createSpace.ObjectId);
  const hasRun = useSelector((state) => state.SpaceNotes.isRun);
  const isMobileScreen = useMediaQuery("(max-width:430px)");

  const editor = BlockNoteEditor.create({
    initialContent: initialContent,
  });

  useEffect(() => {
    fetchUserNote();
  }, [spaceId, hasRun]);

  return (
    <div>
      <Box
        sx={{
          position: "absolute",
          backgroundColor: "#f4f4f4",
          height: "58rem",
          borderRadius: "1rem",
          width: isMobileScreen ? "28rem" : '58rem',
          left: isMobileScreen ? '-2rem' : "17rem",
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
