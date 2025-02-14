import { Box, useMediaQuery, Drawer, Button } from "@mui/material";
import Actions from "./Actions/index";
import AccountProfile from "./AccountProfile/index";
import ExitArrow from "./assets/ExitArrow.svg";
import { useState } from "react";
import Summary from "../Summary";
import { AddImage } from "../../components";

export default function Index() {
  const isMobileScreen = useMediaQuery("(max-width:400px)");
  const [open, setOpen] = useState(false);
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
            backgroundColor: "#f4f4f4",
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
      )}
      ;
      <Summary />
      <AddImage />
    </>
  );
}
