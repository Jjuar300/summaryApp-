import { Typography, Box } from "@mui/material";

export default function Notes({ spaceText }) {
  return (
    <>
    
        <Typography
          sx={{
            position:'absolute', 
            fontSize: "1.7rem",
            left: "-16rem",
            top: "3.8rem",
            color: "#484848",
            fontWeight: "bold",
            textAlign:'left', 
            zIndex:'888'
          }}
        >
          {spaceText}
        </Typography>
    </>
  );
}
