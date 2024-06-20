import React from "react";
import { Box, Typography } from "@mui/material";
import {useMediaQuery} from "@mui/material";
import { addcircle } from "./assets";
import { useNavigate } from "react-router-dom";

export default function SpaceCreate({
  handleButtonClicked,
}) {

  const isMobileScreen = useMediaQuery("(max-width:400px)");
  const navigate = useNavigate(); 

  const createSpaceStyle = {
    display: "flex",
    position: "relative",
    top: "10rem",
    left: isMobileScreen ? "-.6rem" : "-.3rem",
    ":hover": {
      cursor: "pointer",
      background: "#fefefe",
    },
    width: "10rem",
    padding: ".5rem",
    paddingRight: isMobileScreen ? "11.4rem" : "3rem",
    paddingLeft: isMobileScreen ? "3rem" : "1.5rem",
    transition: "background .2s ease-in-out",
    opacity: ".6",
    fontSize: "1.2rem",
  };

  return (
    <>
      <Box onClick={(e) => navigate('/browsespace')} sx={createSpaceStyle}>
        <Typography>Browse All</Typography>
      </Box>

      <Box onClick={handleButtonClicked} sx={createSpaceStyle}>
        <Typography>Create Space</Typography>

        <Box
          sx={{
            position: "relative",
            left: isMobileScreen ? "13rem" : "6rem",
          }}
        >
          <img src={`${addcircle}`} />
        </Box>
      </Box>
    </>
  );
}
