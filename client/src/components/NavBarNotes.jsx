import { Typography, Box } from "@mui/material";

export default function Notes({ spaceText }) {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "98rem",
          left: "15.2rem",
          top: "1rem",
          paddingLeft: "2rem",
          borderColor: "#cfcfcf",
          paddingBottom: ".7rem",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.2rem",
            left: "18rem",
            top: "2rem",
            color: "#484848",
            fontWeight: "bold",
          }}
        >
          {spaceText}
        </Typography>

      </Box>
    </>
  );
}
