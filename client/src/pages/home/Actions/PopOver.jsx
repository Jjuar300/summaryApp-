import React from "react";

export default function PopOver({
  Popover,
  open,
  anchorEl,
  handleClose,
  isMobileScreen,
  PopoverContainer,
  renameButtonStyle,
  handleRenameSpace,
  deleteButonStyle,
  handleDeleteSpace,
}) {
  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          display: "flex",
          flexDirection: "row",
          left: isMobileScreen ? "-3rem" : "8rem",
          top: isMobileScreen ? '' : '10rem', 
          width: "22rem",
          textTransform: "",
        }}
      >
        <PopoverContainer
          text={"Rename"}
          buttonStyle={renameButtonStyle}
          submitOnClick={handleRenameSpace}
        />
        <PopoverContainer
          text={"Delete"}
          buttonStyle={deleteButonStyle}
          submitOnClick={handleDeleteSpace}
        />
      </Popover>
    </>
  );
}
