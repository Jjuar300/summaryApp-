import Actions from "../home/Actions";
import AccountProfile from "../home/AccountProfile";
import searchIcon from "./assets/search.svg";

import { Box, Typography, TextField, InputAdornment } from "@mui/material";

export default function index() {
  return (
    <div>
      <Box
        sx={{
          position: "absolute",
          left: "40rem",
          top: "8rem",
          width: "32rem",
        }}
      >
        <Typography
          sx={{
            fontSize: "2rem",
            color: "#757676",
            fontWeight: "bold",
          }}
        >
          Browse All
        </Typography>

        <TextField
          fullWidth
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment sx={{ opacity: ".5" }} position="start">
                <img src={searchIcon} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          backgroundColor: "#f9f9f9",
          width: "16rem",
          height: "59.8rem",
          left: ".2rem",
          top: ".05rem",
          borderRight: "1px solid #cfcfcf",
        }}
      >
        <AccountProfile />
        <Actions />
      </Box>
    </div>
  );
}
