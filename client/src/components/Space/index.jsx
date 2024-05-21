import { Box, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { memo, useState } from "react";


const  index = ({
  text,
  isSpaceIcon,
  leftSpaceIcon,
  rightSpaceIcon,
  inlineStyle,
  rightSpaceIconClick,
  setState,
  setObjectId,
  ObjectId,
  isRightIcon, 
}) => {
  const isMobileScreen = useMediaQuery("(max-width:400px)");

  const handleRightIconClick = () => {
    setState(text);
    // rightSpaceIconClick(event);
  };

  const handleSpaceClick = () => {
    setState(text);
    setObjectId(ObjectId);
  };

  return (
    <>
      <Box 
      onClick={handleSpaceClick} sx={inlineStyle}>
        <Typography
          sx={{
            width: "20rem",
          }}
        >
          {text}
        </Typography>
        {/* {isRightIcon ? (
          <Box
            onClick={handleRightIconClick}
            sx={{
              position: "absolute",
              display: "flex",
              left: isMobileScreen ? "22.5rem" : "14.2rem",
              height: "1rem",
              top: "0.8rem",
            }}
          >
            <img src={`${rightSpaceIcon}`} />
          </Box>
        ) : null} */}

        {isSpaceIcon ? (
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              left: isMobileScreen ? "2.5rem" : "1.4rem",
              height: "1rem",
              top: "0.7rem",
            }}
          >
            <img src={`${leftSpaceIcon}`} />
          </Box>
        ) : null}
      </Box>
    </>
  );
}

export default memo(index); 