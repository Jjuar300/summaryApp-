import { Typography, Box } from "@mui/material";

export default function Notes({
  spaceText, 
}) {
  return (
    <>
      <Box
      sx={{
        position:'relative', 
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
          {spaceText}
        </Typography>

        <Typography
          sx={{
            position:'absolute', 
            fontSize: "1.2rem",
            color:'#484848', 
            fontWeight:'bold',  
            left: "72rem",
            top: "0rem",
        }}
        >
          Edit Notes Icon
        </Typography>


        <Typography
          sx={{
            position:'absolute', 
            fontSize: "1.2rem",
            left: "85rem",
            top: "0rem",
            color:'#484848', 
            fontWeight:'bold',  
        }}
        > 
        Ask question!
        </Typography>
      </Box>
    </>
  );
}
