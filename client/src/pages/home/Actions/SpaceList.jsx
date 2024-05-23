import { Box } from "@mui/material";

export default function SpaceList({
  spaces,
  isMobileScreen,
  setEditText,
  editText,
  noteCards,
  Space,
  setAnchorEl,
}) {
  const handleClickContext = (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  return (
    <>
      {spaces.map((data) =>
        data.Spaces.map((data) => (
          <Box onContextMenu={handleClickContext} key={data?._id}>
            <Space
              key={data?._id}
              text={data?.text}
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
            />
          </Box>
        ))
      )}
    </>
  );
}
