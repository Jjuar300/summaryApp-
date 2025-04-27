import { Box, Button, Modal } from "@mui/material";
import { setFeedBackOpen, setNotify } from "../../Redux/feedBack";
import { useDispatch, useSelector } from "react-redux";

export default function index() {
  const isFeedBackModalOpen = useSelector(state => state.feedBack.isOpen)
  const dispatch = useDispatch(); 

  function activateFeed() {
   dispatch(setNotify(true))
    setTimeout(() => {
      dispatch(setNotify(false));
    }, 3000);
  }
  function sendFeedBack(){
    dispatch(setFeedBackOpen(false));
    activateFeed(); 
  }

    return (
    <div>
      <Modal open={isFeedBackModalOpen}>
       
        <Box sx={{
                position: "absolute",
                backgroundColor: "white",
                height: "50vh",
                width: "80vw",
                left: "2rem",
                top: "10rem",
                outline: "none",
                borderRadius: ".6rem",
                boxShadow: "0 0 60px rgba(176, 172, 172, 0.2)",
        }}>
          <h2 style={{
               position: "relative",
               color: "#656464",
               left: "2.5rem",
               top: "1rem",
               fontFamily: "Inter",
               fontSize: "1.3rem",
          }}>{'Send us a feeback!'}</h2>

          <textarea style={{
              position: "relative",
              outline: "none",
              width: "18rem",
              height: "10rem",
              left: "1.4rem",
              top: "3rem",
              fontSize: "1.5rem",
              fontFamily: "Inter",
              color: "#2c2c2c",
              borderRadius: ".6rem",
              border: "1px solid #352033",
              boxShadow: "0 0 2.5px #352033",
          }} />

          <Button
            sx={{    position: "absolute",
                top: "20rem",
                left: "1rem",
                border: "1px solid gray",
                width: "9rem",
                height: "4rem",
                borderRadius: ".6rem",
                color: "black",
                boxShadow: "0 0 3px gray",}}
            onClick={() => dispatch(setFeedBackOpen(false))}
          >
            {'Dismiss'}
          </Button>
          <Button 
          onClick={() => sendFeedBack()}
          sx={{
                position: "absolute",
                top: "20rem",
                left: "11rem",
                border: "1px solid gray",
                width: "9rem",
                height: "4rem",
                borderRadius: ".6rem",
                color: "white",
                boxShadow: "0 0 3px gray",
                backgroundColor: "#47046e",
          }}>{'Send Feedback'}</Button>
        </Box>
      </Modal>
    </div>
  );
}
