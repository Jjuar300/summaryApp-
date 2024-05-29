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
    console.log("value:", value);
    dispatch(sendObjectId(value));
    setEditText(editText);
    dispatch(handleSpaceText(editText));
  };

  const isMobileScreen = useMediaQuery("(max-width:400px)");

  return (
    <>
      {spaces?.map((data) =>
          <Box
            onContextMenu={(e) => handleClickContext(e, data?._id, data?.name)}
            key={data?._id}
          >
            <Space
              key={data?._id}
              text={data?.name}
              inlineStyle={{
                display: "flex",
                position: "relative",
                top: "11rem",
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
                backgroundColor: editText === data?.Text && "#ededed",
                borderRight: editText === data?.Text && "3px solid gray",
              }}
              isRightIcon={true}
              isSpaceIcon={true}
              leftSpaceIcon={noteCards}
              setState={setEditText}
              ObjectId={data?._id}
            />
          </Box>
        
      )}
    </>
  );
}
