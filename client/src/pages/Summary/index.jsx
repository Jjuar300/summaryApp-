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
import { useSelector, useDispatch } from "react-redux";
import { useGetData, useUserNote } from "../../hooks";
import { setNoteId } from "../../Redux/SpaceNotes";

export default function index() {
  // const [initialContent, setInitialContent] = useState(undefined);
  // const [savedData, setSavedData] = useState([]); 
  const userData = useGetData(); 
  const {savedData, initialContent, fetchUserNote} = useUserNote(); 
  const spaceId = useSelector(state => state.createSpace.ObjectId)
  // const noteMongoId = savedData?.notes?.[0]?._id; 
  
  const isSpaceId = userData.space.find(space => space._id === spaceId)
  const isNote =  isSpaceId?.notes[0]?._id; 
  const { user } = useUser();
  const isNoteId = isSpaceId?.notes[0]?._id; 
  const dispatch = useDispatch(); 
  const isNoteRedux = useSelector(state => state.SpaceNotes.isNoteId);

  // console.log('noteId:', noteId)
  console.log('spaceId:', spaceId)
  console.log('savedData:',savedData)
  console.log('isNoteId:', isNoteId)
  // console.log('noteMongoId:', noteMongoId)
  console.log('isNote:', isNote)

  console.log('isSavedData:',savedData)
  console.log('isSpaceId:', isSpaceId)
  console.log('isNoteCreate:', userData.space.some(obj => obj?._id === spaceId))
  console.log('initialContent:', initialContent)
  console.log('isNoteRedux:', isNoteRedux)

  const editor = BlockNoteEditor.create({
    initialContent: initialContent,
  });
  isNoteId === undefined ? dispatch(setNoteId(undefined)) :  dispatch(setNoteId(isNoteId))

  
   const handleEditorChange = async (jsonBlock) => {
    console.log('isNoteValue:', isNote)
    if (isNoteRedux === undefined) {
      
       await postData("/api/userNotes", {
        content: JSON.stringify(jsonBlock),
        userId: user?.id,
        // isNoteId: isNoteRedux,
        spaceId: spaceId, 
      });
    } else {
     await updateData("/api/updateUserNotes", {
        content: JSON.stringify(jsonBlock),
        userId: user?.id,
        noteDoId: isNote, 
      });
    }
  
  };

  const postEditorChange = async (jsonBlock) => {
  
     if(isNote === undefined ){
      await postData("/api/userNotes", {
        content: JSON.stringify(jsonBlock),
        userId: user?.id,
        // isNoteId: spaceId,
        spaceId: spaceId, 
      });
     }

  }
  
  const updateEditorChange = async (jsonBlock) => {
    await updateData("/api/updateUserNotes", {
      content: JSON.stringify(jsonBlock),
      userId: user?.id,
      noteDoId: isNote, 
    });
  }
  
  //  const fetchUserNote = async () => {
  //   // const savedContent = await fetchData(`/api/userNotes/${user?.id}`);
  //   const savedContent = await fetchData(`/api/users/${user?.id}/spaces/${spaceId}`);
  //   setSavedData(savedContent)
  //   if (savedContent) {
  //     const blocks = JSON.parse(savedContent?.notes?.[0]?.content);
  //     return setInitialContent(blocks);
  //   }
  // };

  useEffect(() => {
    fetchUserNote()
  }, [spaceId]);

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
          onChange={() => isNote === undefined ? postEditorChange(editor.document) : updateEditorChange(editor.document)}
          theme={"light"}
          data-background-theming-css
        />
      </Box>
    </div>
  );
}