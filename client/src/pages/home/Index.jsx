import { Box,useMediaQuery, Drawer, Button } from "@mui/material";
import Actions from "./Actions/index";
import AccountProfile from "./AccountProfile/index";
import ExitArrow from "./assets/ExitArrow.svg";
import { useState } from "react";
import Notes from "./Notes/index";
import ChatGpt from "./ChatGpt/index";

export default function Index() {
  const isMobileScreen = useMediaQuery("(max-width:400px)");
  const [open, setOpen] = useState(false);

  return (
    <>
      <Notes />
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
            height: "59.8rem",
            left: ".2rem",
            top: ".05rem",
            // borderRight: "1px solid #cfcfcf",
            borderTopRightRadius:'1rem',
            borderBottomRightRadius:'1rem', 
          }}
        >
          <AccountProfile />
          <Actions />
        </Box>
      )}

      <ChatGpt />
    </>
  );
}
