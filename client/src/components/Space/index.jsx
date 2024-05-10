import { Box, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import {useDispatch} from 'react-redux'
import { handleInputValue } from "../../Redux/createSpace";

export default function index({
  text,
  isSpaceIcon,
  leftSpaceIcon,
  rightSpaceIcon,
  inlineStyle,
  rightSpaceIconClick,
  setState,
}) {
  const isMobileScreen = useMediaQuery("(max-width:400px)");
  const dispatch = useDispatch(); 

  const handleRightIconClick = (event) => {
    setState(text);
    rightSpaceIconClick(event);
    dispatch(handleInputValue(text))
  };

  const handleSpaceClick = () => {
    setState(text);
    dispatch(handleInputValue(text))
  };

  return (
    <>
      <Box onClick={handleSpaceClick} sx={inlineStyle}>
        <Typography
        sx={{
          width:'20rem', 
        }}
        >{text}</Typography>
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
