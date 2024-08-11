import { Box } from "@mui/material";
import { sendObjectId, handleSpaceText } from "../../../Redux/createSpace";
import { useDispatch } from "react-redux";
import { noteCards } from "./assets";
import { useMediaQuery } from "@mui/material";

export default function SpaceList({
  spaces,
  setEditText,
  editText,
  Space,
  setAnchorEl,
}) {
  const dispatch = useDispatch("");
  const handleClickContext = (event, value, editText) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    dispatch(sendObjectId(value));
    setEditText(editText);
    dispatch(handleSpaceText(editText));
  };

  const isMobileScreen = useMediaQuery("(max-width:400px)");

  return (
    <>
      {spaces?.map(({ _id, name }) => (
        <Box onContextMenu={(e) => handleClickContext(e, _id, name)} key={_id}>
          <Space
            key={_id}
            text={name}
            inlineStyle={{
              display: "flex",
              position: "relative",
              top: "7rem",
              left: "-0.5rem",
              ":hover": {
                cursor: "pointer",
                background: "#ededed",
              },
              width: "12rem",
              padding: ".5rem",
              paddingRight: isMobileScreen ? "11.4rem" : "1.3rem",
              paddingLeft: isMobileScreen ? "4rem" : "3rem",
              transition: "background .2s ease-in-out",
              opacity: ".8",
              fontSize: "1.2rem",
              backgroundColor: editText === name && "#ededed",
              borderRight: editText === name && "3px solid gray",
            }}
            isRightIcon={true}
            isSpaceIcon={true}
            leftSpaceIcon={noteCards}
            setState={setEditText}
            ObjectId={_id}
          />
        </Box>
      ))}
    </>
  );
}
