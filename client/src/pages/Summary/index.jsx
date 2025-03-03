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
import { useSelector } from "react-redux";

export default function index() {
  const [initialContent, setInitialContent] = useState(undefined);
  const [noteId, setNote] = useState([]);
  const [savedData, setSavedData] = useState([]); 
  const spaceId = useSelector(state => state.createSpace.ObjectId)
  const noteMongoId = savedData?.notes?.[0]?._id; 
  const isNoteId = savedData?.notes?.[0]?._id == noteId; 
  const { user } = useUser();
  
  console.log('noteId:', noteId)
  console.log('spaceId:', spaceId)
  console.log('savedData:',savedData)
  console.log('isNoteId:', isNoteId)
  console.log('isnoteUndefined:', noteId == undefined)
  console.log('noteMongoId:', noteMongoId)

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
        isNoteId: isNoteId,
        spaceId: spaceId, 
      });
    } else {
      await updateData("/api/updateUserNotes", {
        content: JSON.stringify(jsonBlock),
        userId: user?.id,
        noteDoId: noteMongoId, 
      });
    }
  };

  const fetchUserNote = async () => {
    // const savedContent = await fetchData(`/api/userNotes/${user?.id}`);
    const savedContent = await fetchData(`/api/users/${user?.id}/spaces/${spaceId}`);
    setSavedData(savedContent)

    if (savedContent) {
      const blocks = JSON.parse(savedContent?.notes?.[0]?.content);
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
  }, [noteId, spaceId]);

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


       
/*
client: 

if (isNoteId *true*) {
  
  setTimeout(async () => {
    await getNoteUserId();
  }, 1000);
  
  await postData("/api/userNotes", {
    content: JSON.stringify(jsonBlock),
    userId: user?.id,
    isNoteId: isNoteId,
    spaceId: spaceId, 
  });
} else {
  await updateData("/api/updateUserNotes", {
    content: JSON.stringify(jsonBlock),
    userId: user?.id,
    noteDoId: noteMongoId, 
  });
}
};

backend: 

const create = async (req, res) => {
  try {
    const { content, userId, isNoteId, spaceId  } = req.body;

    console.log('isNoteId:', isNoteId)

    if (isNoteId *true* ) {
      const note =  await Notes.create({ content, userId });
  
      await Space.findOneAndUpdate(
       {_id: spaceId *romandId*}, 
       {$addToSet: {notes: note._id}}
      )
      
      
    } else {
      console.log("Note already created!");
    }
  } catch (error) {
    res.status(500).json({ error: "internal error" });
    console.log("error occurred when creating Note:", error);
  }
};

*/