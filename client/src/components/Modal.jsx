import { Box, Button, Typography, Modal, TextField } from "@mui/material";

export default function DeleteModal({
  isOpen,
  setOpen,
  onClick,
  inlineStyle,
  textQuestion,
  textInformation,
  textLeftButton,
  textRightButton,
  isText,
  isInput,
  inputStyle,
  onChange,
  previousText,
}) {
  return (
    <>
      <Modal open={isOpen}>
        <Box sx={inlineStyle}>
          {isText ? (
            <Typography
              sx={{
                position: "absolute",
                left: "2rem",
                top: "2rem",
                fontSize: "1.3rem",
              }}
            >
              {textQuestion}
            </Typography>
          ) : null}

          {isText ? (
            <Typography
              sx={{
                position: "absolute",
                left: "2rem",
                top: "7rem",
                fontSize: "1rem",
                opacity: ".6",
              }}
            >
              {textInformation}
            </Typography>
          ) : null}

          <form onSubmit={onClick}>
            {isInput ? (
              <>
                <TextField
                  size="small"
                  type="text"
                  defaultValue={previousText}
                  onChange={onChange}
                  sx={inputStyle}
                />

                <Typography
                sx={{
                  position:'absolute', 
                  top:'8.6rem',
                  left:'20rem',  
                  fontSize:'.9rem'
                }}
                >0/20</Typography>
              </>
            ) : null}

            <Button
              type="submit"
              sx={{
                position: "absolute",
                top: "11rem",
                left: "17rem",
                backgroundColor: "#47046e",
                color: "white",
                width: "6rem",
              }}
            >
              {textRightButton}
            </Button>
          </form>

          <Button
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              top: "11rem",
              left: "12rem",
              color: "black",
            }}
          >
            {textLeftButton}
          </Button>
        </Box>
      </Modal>
    </>
  );
}
