import { Box, useMediaQuery, Drawer, Button } from "@mui/material";
import Actions from "./Actions/index";
import AccountProfile from "./AccountProfile/index";
import ExitArrow from "./assets/ExitArrow.svg";
import { useState } from "react";
import ChatGpt from "./ChatGpt/index";
import Summary from "../Summary";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useGetChatgpt } from "../../hooks";
import { AddImage } from "../../components";

export default function Index() {
  const isMobileScreen = useMediaQuery("(max-width:400px)");
  const [open, setOpen] = useState(false);
  const [isGptSend, GptSend] = useState(false);
  const [content, setcontent] = useState("");

  const editor = useEditor({
    extensions: [StarterKit],
  });

  const { chatgptData } = useGetChatgpt();

  const handleClick = () => {
    GptSend(true);
    const formatted = chatgptData
      ?.map((data) => `<p>${data?.response}</p>`)
      .join("");
    editor.commands.setContent(formatted);
    setContent('formatted');
  };

  console.log("editorIn home:", editor?.getHTML());

  return (
    <>
      {isMobileScreen ? (
        <>
          <Drawer open={open}>
            <Box
              sx={{
                width: "25rem",
              }}
            >
              <AccountProfile />
              <Actions />
              <Button
                onClick={() => setOpen(false)}
                sx={{
                  position: "absolute",
                  left: "18rem",
                  top: "1rem",
                  opacity: ".4",
                }}
              >
                <img src={`${ExitArrow}`} />
              </Button>
            </Box>
          </Drawer>

          <Button
            onClick={() => setOpen(true)}
            sx={{
              position: "absolute",
              left: "1rem",
              top: "1rem",
              opacity: ".4",
              transform: "rotate(.5turn)",
            }}
          >
            <img src={`${ExitArrow}`} />
          </Button>
        </>
      ) : (
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "#F8F5FD",
            width: "16rem",
            height: "59rem",
            left: ".2rem",
            top: ".05rem",
            borderTopRightRadius: "1rem",
            borderBottomRightRadius: "1rem",
          }}
        >
          <AccountProfile />
          <Actions />
        </Box>
      )};

     <Summary/>
     <AddImage/>
    </>
  );
}
