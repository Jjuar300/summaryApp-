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
import { useGetData } from "../../hooks";

export default function index() {
  const [initialContent, setInitialContent] = useState(undefined);
  const [noteId, setNote] = useState([]);
  const [savedData, setSavedData] = useState([]); 
  const userData = useGetData(); 
  const spaceId = useSelector(state => state.createSpace.ObjectId)
  // const noteMongoId = savedData?.notes?.[0]?._id; 
  const isNoteId = savedData?.notes?.[0]?._id; 
  const isSpaceId = userData.space.find(space => space._id == spaceId)
  const isNote =  isSpaceId?.notes[0]?._id; 
  const { user } = useUser();

  // console.log('noteId:', noteId)
  console.log('spaceId:', spaceId)
  console.log('savedData:',savedData)
  console.log('isNoteId:', isNoteId)
  console.log('isnoteUndefined:', noteId === undefined)
  // console.log('noteMongoId:', noteMongoId)
  console.log('isNote:', isNote)

  console.log('isSavedData:',savedData)
  console.log('isSpaceId:', isSpaceId)
  console.log('isNoteCreate:', userData.space.some(obj => obj?._id === spaceId))
  console.log('initialContent:', initialContent)
  
  const editor = BlockNoteEditor.create({
    initialContent: initialContent,
  });

  const handleEditorChange = async (jsonBlock) => {
     console.log('isNoteValue:', isNote)
    if (isNote === undefined) {
      
     return  await postData("/api/userNotes", {
        content: JSON.stringify(jsonBlock),
        userId: user?.id,
        // isNoteId: isNote,
        spaceId: spaceId, 
      });
    } else {
     return await updateData("/api/updateUserNotes", {
        content: JSON.stringify(jsonBlock),
        userId: user?.id,
        noteDoId: isNote, 
      });
    }
  
  };

  const handlePostEditor = async (jsonBlock) => {
    return  await postData("/api/userNotes", {
      content: JSON.stringify(jsonBlock),
      userId: user?.id,
      // isNoteId: isNote,
      spaceId: spaceId, 
    });
  }

  const handleUpdateEditor = async (jsonBlock) =>{ 
    return await updateData("/api/updateUserNotes", {
      content: JSON.stringify(jsonBlock),
      userId: user?.id,
      noteDoId: isNote, 
    });
  }


  const fetchUserNote = async () => {
    // const savedContent = await fetchData(`/api/userNotes/${user?.id}`);
    const savedContent = await fetchData(`/api/users/${user?.id}/spaces/${spaceId}`);
    setSavedData(savedContent)

    if (savedContent) {
      const blocks = JSON.parse(savedContent?.notes?.[0]?.content);
      return setInitialContent(blocks);
    }
  };

  // const getNoteUserId = async () => {
  //   const response = await fetchData(`/api/userNotes/${user?.id}/spaces/${spaceId}`);
  //   setNote(response);
  // };

  useEffect(() => {
    // getNoteUserId();
    // handleEditorChange();
    handlePostEditor();
    handleUpdateEditor();
    fetchUserNote();
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
          onChange={() => !isNote ? handlePostEditor(editor.document) : handleUpdateEditor(editor.document)}
          theme={"light"}
          data-background-theming-css
        />
      </Box>
    </div>
  );
}


       
/*
client: 

 const isSpaceId = *match if there is
 a space called roman empire if so
 then create note for that space, else if
 is other new space then create note else
 then update content. 
 *

if (isSpaceId) {
  
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