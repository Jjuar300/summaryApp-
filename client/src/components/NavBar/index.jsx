import { Box } from "@mui/material";
import exitArrow from "./assets/ExitArrow.svg";

export default function index({onclick}) {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          width: "7rem",
          ":hover": { cursor: "pointer" },
          opacity: ".4",
        }}
      >
        <img onClick={onclick} src={`${exitArrow}`} />
      </Box>
    </>
  );
}
