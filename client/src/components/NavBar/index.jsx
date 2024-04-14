import { 
    Box, 
} from "@mui/material"

export default function index({
    submitClickFunction, 
}) {
  return (
    <>
     <Box>
        <h1
        onClick={submitClickFunction}
        >Logo</h1>
     </Box>
    </>
  )
}
