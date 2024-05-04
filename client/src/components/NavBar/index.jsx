import { Box } from "@mui/material";
import exitArrow from "./assets/ExitArrow.svg";
import { useNavigate } from "react-router-dom";

export default function index({ submitClickFunction }) {
  const navigate = useNavigate();
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
        <img onClick={() => navigate("/")} src={`${exitArrow}`} />
      </Box>
    </>
  );
}
