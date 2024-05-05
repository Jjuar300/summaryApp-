import { Box, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";

export default function index({
  text,
  CreateSpaceIcon,
  isSpaceIcon,
  leftSpaceIcon,
  rightSpaceIcon,
  isCreateSpaceIcon,
  inlineStyle,
  onClick,
  rightSpaceIconClick,
  setState,
}) {
  const isMobileScreen = useMediaQuery("(max-width:400px)");

  const handleRightIconClick = (event) => {
    setState(text);
    rightSpaceIconClick(event);
  };

  const handleSpaceClick = () => {
    setState(text);
  };

  return (
    <>
      <Box onClick={handleSpaceClick} sx={inlineStyle}>
        <Typography>{text}</Typography>
        {isSpaceIcon ? (
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
        ) : null}

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
