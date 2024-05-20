export default function SpaceList({
  spaces,
  isMobileScreen,
  handleClick,
  setEditText,
  editText,
  setObjectId,
  dragIndicator,
  noteCards,
  Space,
}) {
  return (
    <>
      {spaces.map((data) =>
        data.Spaces.map((data) => (
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
            isSpaceIcon={true}
            rightSpaceIcon={dragIndicator}
            leftSpaceIcon={noteCards}
            rightSpaceIconClick={handleClick}
            setState={setEditText}
            editText={editText}
            setObjectId={setObjectId}
            ObjectId={data?._id}
          />
        ))
      )}
    </>
  );
}
