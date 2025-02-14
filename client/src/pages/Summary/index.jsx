import { Box } from "@mui/material";
import Notes from "../home/Notes";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "./styles/note.css";

import "./styles/index.css";
export default function index() {
  const BlockNoteEditor = useCreateBlockNote({
    domAttributes: {
      block: { class: "hello-world" },
    },

    initialContent: [{ type: "paragraph", content: "" }],
  });

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
          editor={BlockNoteEditor}
          theme={"light"}
          data-background-theming-css
        />
      </Box>
    </div>
  );
}
