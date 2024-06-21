import Actions from "../home/Actions";
import AccountProfile from "../home/AccountProfile";
import searchIcon from "./assets/search.svg";
import { useSelector } from "react-redux";
import { useGetData } from "../../hooks";

import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import { useState } from "react";

export default function Index() {
  const { space } = useGetData();
  const [search, setSearch] = useState(''); 

  const handleSearchChange = (e) => {
   setSearch(e.target.value); 
  }; 


  const filterSpaces = space.filter(({name}) => name.toLowerCase().includes(search.toLowerCase())); 

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
          onChange={handleSearchChange}
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

      <Box
        sx={{
          position: "absolute",
          left: "40rem",
          top: "17rem",
        }}
      >
        {
        filterSpaces?.map(({ _id, name }) => (
          <Typography sx={{ 
            fontSize: "1.3rem", 
            padding:'.5rem', 
            color:'#3f3f3f',
            ":hover" : {cursor:'pointer'}
             }} key={_id}>
            {name}
          </Typography>
        ))}
      </Box>
    </div>
  );
}
