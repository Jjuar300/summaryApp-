import { Box, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { memo } from "react";

const index = ({
  text,
  isSpaceIcon,
  leftSpaceIcon,
  inlineStyle,
  setState,
}) => {
  const isMobileScreen = useMediaQuery("(max-width:400px)");

  const handleSpaceClick = () => {
    setState(text);
  };

  return (
    <>
      <Box onClick={handleSpaceClick} sx={inlineStyle} >
        <Typography
          sx={{
            width: "20rem",
          }}
        >
          {text}
        </Typography>

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
};

export default memo(index);
