import { Box, Button, TextField, Typography } from "@mui/material";
import { fetchData, postData } from "../../../utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { setChatGptId } from "../../../Redux/chatGpt";

export default function index() {
  const [askMessage, setAskMessage] = useState();
  const [chatgptData, setChatgptData] = useState([]);
  const objectId = useSelector((state) => state.createSpace.ObjectId);
  const {user} = useUser(); 
  const chatgptId = chatgptData[0]?._id; 
  const dispatch = useDispatch(); 

  const askGpt = async (e) => {
    e?.preventDefault();
    try {
      await postData("/api/chatgpt", {
        message: askMessage,
        spaceId: objectId,
      });
      getChatGpt();
    } catch (error) {
      console.log(error);
    }
  };

  const getChatGpt = async () => {
    const response = await fetchData(`/api/users/${user.id}/spaces/${objectId}`); 
    if(response?.chatGpt){
     return setChatgptData(response?.chatGpt);
    }
  };

  dispatch(setChatGptId(chatgptId))

  useEffect(() => {
    getChatGpt();
  }, [objectId]);


  return (
    <>
      <Box
        sx={{
          position: "absolute",
          left: "23rem",
          top: "23rem",
        }}
      >
        <TextField onChange={(e) => setAskMessage(e.target.value)} />
        <Button onClick={askGpt}>Send message</Button>
        {chatgptData?.map(({ _id, response }) => (
          <Typography key={_id}>{response}</Typography>
        ))}
      </Box>
    </>
  );
}