import { Box, Button, TextField, Typography } from "@mui/material";
import { postData } from "../../../utils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setChatGptId } from "../../../Redux/chatGpt";
import { useGetChatgpt } from "../../../hooks";

export default function index() {
  const [askMessage, setAskMessage] = useState();
  const objectId = useSelector((state) => state.createSpace.ObjectId);
  const {chatgptData, getChatGpt} = useGetChatgpt(); 
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

  dispatch(setChatGptId(chatgptId))

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