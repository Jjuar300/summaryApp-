import { Box, Button } from "@mui/material";
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
  const { user } = useUser();

  const editor = BlockNoteEditor.create({
    initialContent: initialContent,
  });

  const handleEditorChange = async (jsonBlock) => {
    
    await postData("/api/userNotes", {
      content: JSON.stringify(jsonBlock),
      userId: user?.id,
    })

    // if(initialContent === undefined) {
    //   null
    // }else{
    //  await updateData("/api/updateUserNotes", {
    //    content: JSON.stringify(jsonBlock),
    //    userId: user?.id,
    //  });

    // }
   
      // await updateData("/api/updateUserNotes", {
    //   content: JSON.stringify(jsonBlock),
    //   userId: user?.id,
    // });
  };

  const fetchUserNote = async () => {
    const savedContent = await fetchData(`/api/userNotes/${user?.id}`);
    if (savedContent) {
      const blocks = JSON.parse(savedContent?.content);
      return setInitialContent(blocks);
    }
  };

  useEffect(() => {
    fetchUserNote();
  }, []);


  console.log('initialContent:', initialContent)

  /*

  --use redux to store a boolean. 
  -- when user clicks to an element to 
  switch page then it will setState to true. 
  --else if the page is not clicked then the boolean 
  will not change. 

  ex: 

  index.js

  const isNoteSaved = useSelector(state => state.Notes.saveNoteData)

   useEffect(() => {
    fetchUserNote();
  }, [isNoteSaved]);
  
  
  space.jsx
  AccountProfile.jsx
  browseAll.jsx

  const dispatch = useDispatch(); 

  function onClick() {
   dipatch(true)
  }
  */

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
