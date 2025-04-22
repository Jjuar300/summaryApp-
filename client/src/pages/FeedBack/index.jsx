import React from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setOpen } from "../../Redux/feedBack";

export default function index() {
  const isOpen = useSelector((state) => state.feedBack.isOpen);
  const dispatch = useDispatch();

  return (
    <div>
      <Modal open={isOpen}>
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "white",
            height: "40vh",
            width: "80vw",
            left: "2rem",
            top: "10rem",
            outline: "none",
            borderRadius: ".2rem",
            boxShadow:'0 0 60px rgba(176, 172, 172, 0.2)', 
          }}
        >
          <h2
            style={{
              position: "relative",
              color: "#656464",
              left: "2.5rem",
              top: "1rem",
              fontFamily: "Inter",
              fontSize: "1.3rem",
            }}
          >
            Send us your feedback!
          </h2>

          <textarea
          style={{
            position:'relative', 
            outline:'none', 
            width:'18rem',
            height: '6rem' ,
            left:'1.4rem', 
            top:'3rem', 
            fontSize:'1.5rem', 
            fontFamily:"Inter",
            color:'#2c2c2c',
          }}
          />

          <Button
          sx={{
            position:'relative', 
            top:'9rem'
          }}
          onClick={() => dispatch(setOpen(false))}>exit</Button>
        </Box>
      </Modal>
    </div>
  );
}
