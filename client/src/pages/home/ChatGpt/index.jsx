import {
  Box,
  Button,
  TextField,
  Typography,
  Tooltip,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { postData } from "../../../utils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setChatGptId } from "../../../Redux/chatGpt";
import { useGetChatgpt } from "../../../hooks";
import { attachment, effortless, feedBack, send, streamline } from "./assets/index";

export default function index() {
  const [askMessage, setAskMessage] = useState();
  const objectId = useSelector((state) => state.createSpace.ObjectId);
  const { chatgptData, getChatGpt } = useGetChatgpt();
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

  dispatch(setChatGptId(chatgptId));

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          left: "45rem",
          top: "23rem",
        }}
      >
        <TextField
          type="url"
          size="medium"
          placeholder="Enter a link here"
          sx={{
            width: "25rem",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <Tooltip placement="top" title="upload file">
                  <Box
                    sx={{
                      ":hover": {
                        cursor: "pointer",
                        backgroundColor: "#ebeceb",
                      },
                      position: "relative",
                      padding: ".5rem",
                      opacity: ".5",
                      left: ".6rem",
                      top: ".3rem",
                      height: "2rem",
                      borderRadius: 2,
                      transition: "background .2s ease-in-out",
                    }}
                  >
                    <img src={attachment} />
                  </Box>
                </Tooltip>
              </InputAdornment>
            ),
          }}
          onChange={(e) => setAskMessage(e.target.value)}
        />
        <Button
          sx={{
            backgroundColor: "rgba(233, 232, 240, 1)",
            color: "gray",
            padding: "1.1rem",
            width: "10rem",
            ":hover": { backgroundColor: "rgba(221, 218, 240, 1)" },
          }}
          // onClick={askGpt}
        >
          <img src={send} style={{ width: "1.3rem" }} />
        </Button>

        {chatgptData?.map(({ _id, response }) => (
          <Typography key={_id}>{response}</Typography>
        ))}
      </Box>

      <Box
      sx={{
        position:'absolute', 
        display:'flex', 
        left:'45rem',
        top:'32rem' , 
        justifyItems:'center', 
        gap:'3rem', 
      }}
      >
      <img src={effortless} style={{width:'15rem'}}/>
      <img src={streamline} style={{width:'15rem'}}/>

      </Box>

      <Box
       sx={{
        position:'absolute', 
        left:'50rem',
        top:'45rem' , 
      }}
      >
      <Button
      startIcon={<img src={feedBack} />}
      sx={{
        backgroundColor:'black', 

        color:'white', 
        width:"23rem",
        height:'3rem', 
        ":hover" : {
          backgroundColor:'#333333'
        }
      }}
      >
        Feedback
      </Button>
      </Box>
    </>
  );
}
