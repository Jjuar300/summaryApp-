import { Box, Button } from "@mui/material";
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
import { useDispatch, useSelector } from "react-redux";
import { setNoteData } from "../../Redux/Notes";

export default function index() {
  const [initialContent, setInitialContent] = useState(0);
  const [note, setNote] = useState([])

  const { user } = useUser();
  const isNote = useSelector(state => state.NotesData.isCreated);
  const dispatch = useDispatch(); 
  const noteText =  initialContent[0]?.content[0]?.text; 

  const editor = BlockNoteEditor.create({
    initialContent: initialContent,
  });
 

  console.log('noteText:', noteText)
  console.log('isNote:', isNote)
  console.log('initialContent:', initialContent)
  console.log('isNote:', note?._id == null)
  console.log('note:', note)

 const handleEditorChange = async (jsonBlock) => {
   
     dispatch(setNoteData(false))
    if (note?._id == null ) {
   
      await postData("/api/userNotes", {
        content: JSON.stringify(jsonBlock),
        userId: user?.id,
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
    setNote(response); 
  }

  useEffect(() => {
    getNoteUserId(); 
    fetchUserNote();
    handleEditorChange(); 
    
  },[]);
  
  return (
    <div>
    <Button onClick={() => dispatch(setNoteData(true))} >reset</Button>
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
