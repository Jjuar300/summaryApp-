import React from "react";

export default function SpaceCreate({
  createSpaceStyle,
  handleButtonClicked,
  isMobileScreen,
  addcircle,
  Box,
  Typography,
}) {
  return (
    <>
      <Box sx={createSpaceStyle}>
        <Typography>Browse Space</Typography>
      </Box>

      <Box onClick={handleButtonClicked} sx={createSpaceStyle}>
        <Typography>Create Space</Typography>

        <Box
          sx={{
            position: "relative",
            left: isMobileScreen ? "13rem" : "6rem",
          }}
        >
          <img src={`${addcircle}`} />
        </Box>
      </Box>
    </>
  );
}
