import { Box, Button, TextField, Typography } from "@mui/material";
import { fetchData, postData } from "../../../utils";
import { useEffect, useState } from "react";

export default function index() {
  const [askMessage, setAskMessage] = useState()
  const [chatgptData, setChatgptData] = useState([]); 

    const askGpt = async (e) =>{
        e?.preventDefault();
        try {
            await postData('/api/chatgpt', {
              message: askMessage, 
            })
            getChatGpt();
        } catch (error) {
            console.log(error)
        } 
    }
  
    const getChatGpt = async () => {
        const response = await fetchData('/api/chatgpt'); 
        setChatgptData(response);                                      
    }; 

    useEffect(() =>{
        getChatGpt(); 
    },[chatgptData])

    return (
    <>
    <Box
    sx={{
        position:'absolute', 
        left:'23rem', 
        top:'23rem', 
    }}
    >
       <TextField
       onChange={(e) => setAskMessage(e.target.value)}
       />
       <Button
       onClick={askGpt}
       >Send message</Button>
      {
        chatgptData?.map(({_id, response}) => (
            <Typography
            key={_id}
            >{response}</Typography>
        ))
      }
    </Box>
    </>
  )
}
