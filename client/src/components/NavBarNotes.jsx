import { Typography, Box } from "@mui/material";

export default function Notes({ spaceText }) {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "16rem",
          left: "-18rem",
          top: "1rem",
          paddingLeft: "2rem",
          borderColor: "#cfcfcf",
          paddingBottom: ".7rem",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.7rem",
            left: "18rem",
            top: "2rem",
            color: "#484848",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {spaceText}
        </Typography>
      </Box>
    </>
  );
}
