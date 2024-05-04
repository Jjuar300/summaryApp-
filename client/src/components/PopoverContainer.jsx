import { Box, Button } from "@mui/material";

export default function PopoverContainer({
  imageIcon,
  text,
  submitOnClick,
  boxStyle,
  buttonStyle,
  isIcon,
}) {
  return (
    <>
      <Box sx={boxStyle}>
        {isIcon && <img style={{ width: "1.2rem" }} src={`${imageIcon}`} />}
        <Button onClick={submitOnClick} sx={buttonStyle}>
          {text}
        </Button>
      </Box>
    </>
  );
}
