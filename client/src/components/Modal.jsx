import { Box, Button, Typography, Modal, TextField } from "@mui/material";

export default function DeleteModal({
  isOpen,
  setOpenModal,
  onClick,
  inlineStyle,
  textQuestion,
  textInformation,
  textLeftButton,
  textRightButton,
  textCount,
  isText,
  isInput,
  inputStyle,
  onChange,
  previousText,
  text,
}) {
  const MaxLengthOfText = 25;

  let isTextWithoutSpaces = text?.replace(/\s+/g, "");

  isInput ? isTextWithoutSpaces : (isTextWithoutSpaces = true);

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
          c
          <form>
            {isInput ? (
              <>
                <TextField
                  inputProps={{
                    maxLength: MaxLengthOfText,
                  }}
                  size="small"
                  type="text"
                  defaultValue={previousText}
                  onChange={onChange}
                  sx={inputStyle}
                />

                <Typography
                  sx={{
                    position: "absolute",
                    top: "8.6rem",
                    left: "20rem",
                    fontSize: ".9rem",
                  }}
                >
                  {textCount}/25
                </Typography>
              </>
            ) : null}

            <Button
              onClick={isTextWithoutSpaces && onClick}
              sx={{
                position: "absolute",
                top: "11rem",
                left: "17rem",
                backgroundColor: isTextWithoutSpaces ? "#47046e" : "gray",
                color: "white",
                width: "6rem",
                ":hover": {
                  cursor: isTextWithoutSpaces ? "pointer" : "auto",
                  backgroundColor: isTextWithoutSpaces ? "#370355" : "gray",
                },
                opacity: isTextWithoutSpaces ? "1" : ".1",
              }}
            >
              {textRightButton}
            </Button>
          </form>
          <Button
            onClick={() => setOpenModal()}
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
