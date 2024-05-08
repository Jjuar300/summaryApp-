import { Typography, Box } from "@mui/material";
import React from "react";

export default function Notes() {
  return (
    <>
      <Box
      sx={{
        position:'relative', 
        display:'grid',  
        gridTemplateColumns: 'repeat(3, 1fr)' ,
        borderBottom:'1px solid black', 
        width:'98rem', 
        left:'15.2rem',
        top:'1rem',
        paddingLeft:'2rem',    
        borderColor: '#cfcfcf',   
        paddingBottom:'.7rem', 
    }}
      >
        <Typography
          sx={{
            fontSize: "1.2rem",
            left: "18rem",
            top: "2rem",
            color:'#484848', 
            fontWeight:'bold',  
        }}
        >
          Roman Empire
        </Typography>

        <Typography
          sx={{
            fontSize: "1.2rem",
            left: "25rem",
            top: "2rem",
            color:'#484848', 
            fontWeight:'bold',
            gridColumn:'1',   
        }}
        >
          Edit Notes Icon
        </Typography>


        <Typography
          sx={{
            fontSize: "1.2rem",
            left: "18rem",
            top: "2rem",
            color:'#484848', 
            fontWeight:'bold',  
            gridColumn: '4 / span 2 ', 
        }}
        > 
        Ask question!
        </Typography>
      </Box>
    </>
  );
}
