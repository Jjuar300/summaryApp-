import { Box } from "@mui/material";
import Notes from "../home/Notes";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { BlockNoteEditor } from "@blocknote/core";
import { useUser } from "@clerk/clerk-react";

import "./styles/note.css";

import "./styles/index.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { fetchData, postData, updateData } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useGetData, useUserNote } from "../../hooks";
import { setNoteId } from "../../Redux/SpaceNotes";

export default function Index() {
  // const [initialContent, setInitialContent] = useState(undefined);
  // const [savedData, setSavedData] = useState([]);

  const userData = useGetData();
  const { savedData, initialContent, fetchUserNote } = useUserNote();
  const spaceId = useSelector((state) => state.createSpace.ObjectId);
  const hasRun = useSelector((state) => state.SpaceNotes.isRun);

  const isSpaceId = userData.space.find((space) => space._id === spaceId);
  const isNote = isSpaceId?.notes[0]?._id;
  const { user } = useUser();
  const didRun = useRef(false);

  console.log('spaceId:', spaceId)
  console.log('savedData:',savedData)
  console.log('isNote:', isNote)

  console.log('hasRun:', hasRun)

  console.log('isSavedData:',savedData)
  console.log('isSpaceId:', isSpaceId)
  console.log('isNoteCreate:', userData.space.some(obj => obj?._id === spaceId))
  console.log('initialContent:', initialContent)

  const editor = BlockNoteEditor.create({
    initialContent: initialContent,
  });

  const handleEditorChange = async (jsonBlock) => {
    if (isNote === undefined) {
      await postData("/api/userNotes", {
        content: JSON.stringify(jsonBlock),
        userId: user?.id,
        spaceId: spaceId,
      });
    } else {
      await updateData("/api/updateUserNotes", {
        content: JSON.stringify(jsonBlock),
        userId: user?.id,
        noteDoId: isSpaceId?.notes[0]?._id,
      });
    }
  };

  const runEditor = () => {
    if (hasRun) {
      return handleEditorChange();
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (didRun.current) return;

    console.log("handleUseEffect");
    runEditor();
    fetchUserNote();
    didRun.current = true;
  }, [spaceId, hasRun]);

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
