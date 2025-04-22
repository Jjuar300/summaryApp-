import React from "react";
import { Drawer, Box, Button } from "@mui/material";
import AccountProfile from "../pages/home/AccountProfile";
import Actions from "../pages/home/Actions";
import { useDispatch } from "react-redux";

export default function DrawerComp({ open, avatarStyle, setOpen, icon }) {
  const dispatch = useDispatch();
  return (
    <Drawer
      open={open}
      anchor="left"
      PaperProps={{
        sx: {
          height: "58rem",
        },
      }}
    >
      <Box
        sx={{
          width: "20rem",
        }}
      >
        <AccountProfile avatarStyle={avatarStyle} />
        <Actions setOpen={setOpen} />
        <Button
          onClick={() => dispatch(setOpen(false))}
          sx={{
            position: "absolute",
            left: "15rem",
            top: "1rem",
            opacity: ".4",
          }}
        >
          <img src={`${icon}`} />
        </Button>
      </Box>
    </Drawer>
  );
}
