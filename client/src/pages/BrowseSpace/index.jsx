import Actions from "../home/Actions";
import AccountProfile from "../home/AccountProfile";
import searchIcon from "./assets/search.svg";
import { useDispatch } from "react-redux";
import { useGetData } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { sendObjectId } from "../../Redux/createSpace";

import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import { useState } from "react";

export default function Index() {
  const { space } = useGetData();
  const [search, setSearch] = useState(''); 
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 

  const handleSearchChange = (e) => {
   setSearch(e.target.value); 
  }; 


  const filterSpaces = space.filter(({name}) => name.toLowerCase().includes(search.toLowerCase())); 

 const handleClick = (e, ObjectId) =>{ 
  e?.preventDefault(); 
  dispatch(sendObjectId(ObjectId))
  navigate(`/spaces/${ObjectId}`)
 }

  return (
    
    <div>
         <Box
           sx={{
             position: "absolute",
             backgroundColor: "#F8F5FD",
             width: "16rem",
             height: "59.8rem",
             left: ".2rem",
             top: ".05rem",
             // borderRight: "1px solid #cfcfcf",
             borderTopRightRadius:'1rem',
             borderBottomRightRadius:'1rem', 
           }}
           >
           <AccountProfile />
           <Actions />
         </Box>
      <Box
       sx={{
        position:'absolute', 
        backgroundColor:'#FAF6FF',
         height:'58rem', 
         borderRadius:'1rem',
         width:'98.6rem',
         left:'17rem',   
         top:'.5rem', 
      }}
      >
      <Box
        sx={{
          position: "absolute",
          left: "30rem",
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
          left: "30rem",
          top: "17rem",
        }}
        >
        {
          filterSpaces?.map(({ _id, name }) => (
            
            <Typography
            onClick={(e) => handleClick(e, _id)}
            sx={{ 
              fontSize: "1.3rem", 
              padding:'.5rem', 
              color:'#3f3f3f',
              width:'32rem', 
              ":hover": {
                cursor: "pointer",
                background: "#ededed",
              },
              transition: "background .2s ease-in-out"
            }} key={_id}>
            {name}
          </Typography>
        ))}
      </Box>
        </Box>
    </div>
  );
}
