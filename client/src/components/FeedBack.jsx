import { Box, Button, Modal } from "@mui/material";
import { setOpen } from "../Redux/feedBack";
import { useDispatch } from "react-redux";

export default function index({
  ModalStyle,
  FeedBackText,
  FeedBackTextStyle,
  textareaStyle,
  DismissButtonText,
  DismissButtonStyle,
  SendFeedBackText,
  SendFeedBackStyle,
  isModalOpen,
}) {
  const dispatch = useDispatch();

  return (
    <div>
      <Modal open={isModalOpen}>
        <Box sx={ModalStyle}>
          <h2 style={FeedBackTextStyle}>{FeedBackText}</h2>

          <textarea style={textareaStyle} />

          <Button
            sx={DismissButtonStyle}
            onClick={() => dispatch(setOpen(false))}
          >
            {DismissButtonText}
          </Button>

          <Button sx={SendFeedBackStyle}>{SendFeedBackText}</Button>
        </Box>
      </Modal>
    </div>
  );
}
