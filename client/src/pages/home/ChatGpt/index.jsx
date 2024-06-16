import { Box, Button, TextField, Typography } from "@mui/material";
import { fetchData, postData } from "../../../utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Space } from "../../../components";

export default function index() {
  const [askMessage, setAskMessage] = useState();
  const [chatgptData, setChatgptData] = useState([]);
  const objectId = useSelector((state) => state.createSpace.ObjectId);

  console.log(chatgptData[0]?._id);

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
    const response = await fetchData(`/api/spaces/${objectId}`); 
    if(response.chatGpt){
     return setChatgptData(response.chatGpt);
    }
  };

  useEffect(() => {
    getChatGpt();
  }, []);

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