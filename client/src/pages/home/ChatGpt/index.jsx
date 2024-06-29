import {
  Box,
  Button,
  TextField,
  Typography,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import { postData } from "../../../utils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setChatGptId } from "../../../Redux/chatGpt";
import { useGetChatgpt } from "../../../hooks";
import attachment from "./assets/attachment.svg";

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
                      left: "1rem",
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
            padding: ".9rem",
            width: "10rem",
            ":hover": { backgroundColor: "rgba(221, 218, 240, 1)" },
            fontSize: "1rem",
          }}
          onClick={askGpt}
        >
          Upload
        </Button>
        {chatgptData?.map(({ _id, response }) => (
          <Typography key={_id}>{response}</Typography>
        ))}
      </Box>
    </>
  );
}
