import { Box, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { sendObjectId} from "../../Redux/createSpace";
import { handleSpaceText } from "../../Redux/createSpace";
import { useNavigate } from "react-router-dom";

const index = ({
  text,
  isSpaceIcon,
  leftSpaceIcon,
  inlineStyle,
  setState,
  ObjectId, 
}) => {
  const isMobileScreen = useMediaQuery("(max-width:400px)");
  const dispatch = useDispatch()
  const navigate = useNavigate(); 

  const handleSpaceClick = (e) => {
    e?.preventDefault(); 
    setState(text);
    dispatch(sendObjectId(ObjectId))
    dispatch(handleSpaceText(text))
    navigate(`/spaces/${ObjectId}`)
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
