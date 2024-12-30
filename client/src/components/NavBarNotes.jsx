import { Typography, Box } from "@mui/material";

export default function Notes({ spaceText }) {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "30rem",
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
            left: "16rem",
            top: "2rem",
            color: "#484848",
            fontWeight: "bold",
            textAlign:'left', 
          }}
        >
          {spaceText}
        </Typography>
      </Box>
    </>
  );
}
