import { Box, Button, Modal, TextField } from "@mui/material";
import { setFeedBackOpen, setNotify } from "../../Redux/feedBack";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {useMediaQuery} from "@mui/material";

export default function index() {
  const isFeedBackModalOpen = useSelector((state) => state.feedBack.isOpen);
  const dispatch = useDispatch();
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    subject: "",
    textArea: "",
  });
  const [isFormValid, setFormValid] = useState(false);
  const isMobileScreen = useMediaQuery("(max-width:430px)");


  function activateFeed() {
    dispatch(setNotify(true));
    setTimeout(() => {
      dispatch(setNotify(false));
    }, 3000);
  }
  function sendFeedBack() {
    const clearedFormInput = Object.fromEntries(
      Object.keys(formInput).map(key => [key, ''])
    )
    setFormInput(clearedFormInput); 

    setFormValid(false)
    dispatch(setFeedBackOpen(false));
    activateFeed();
  }

  function handleDismissButton(){
    setFormValid(false)
    setFormInput('')
    dispatch(setFeedBackOpen(false))
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const allFilled = Object.values(formInput).every((value) => value.trim() !== "");
    setFormValid(allFilled);
  }, [formInput]);

  return (
    <div>
      <Modal open={isFeedBackModalOpen}>
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "white",
            height: "70vh",
            width: isMobileScreen ? "80vw" : "45vw",
            left: isMobileScreen ? "1.5rem" : "20rem",
            top: "3rem",
            outline: "none",
            borderRadius: ".6rem",
            boxShadow: "0 0 60px rgba(176, 172, 172, 0.2)",
          }}
        >
          <h2
            style={{
              position: "relative",
              color: "#656464",
              left: isMobileScreen ? "4rem" : "18rem",
              top: "0rem",
              fontFamily: "Inter",
              fontSize: "1.3rem",
            }}
          >
            {"Send us a feeback!"}
          </h2>

          <Box
            sx={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              width: isMobileScreen ? "70vw" : "40vw" ,
              left: isMobileScreen ? "1rem" : "2.5rem",
              fontSize: "1.2",
            }}
          >
            <TextField
              name="name"
              inputProps={{ maxLength: "20" }}
              onChange={(e) => handleChange(e)}
              value={formInput?.name}
              placeholder="Name"
              type="text"
            />
            <TextField
               name="email"
              inputProps={{ maxLength: "40" }}
              onChange={(e) => handleChange(e)}
              value={formInput?.email}
              placeholder="Email"
              type="email"
            />
            <TextField
              name="subject"
              inputProps={{ maxLength: "40" }}
              onChange={(e) => handleChange(e)}
              value={formInput?.subject}
              placeholder="Subject"
              type="text"
            />
          </Box>

          <textarea
            name="textArea"
            placeholder="Enter message"
            maxLength={80}
            onChange={(e) => handleChange(e)}
            value={formInput?.textArea}
            style={{
              position: "relative",
              outline: "none",
              width: isMobileScreen ? "18rem" : "25rem",
              height: "10rem",
              left: isMobileScreen ? "1.4rem" : "13rem",
              top: "16rem",
              fontSize: "1.2rem",
              fontFamily: "Inter",
              color: "#2c2c2c",
              borderRadius: ".6rem",
              border: "none",
              boxShadow: "0 0 3px #352033",
              resize: "none",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "30.4rem",
              left: isMobileScreen ? "17.5rem" : "33rem",
            }}
          >
            {formInput?.textArea?.length}/80
          </span>

         
           <Button
            sx={{
              position: "absolute",
              top: "33rem",
              left: isMobileScreen ? "1rem" : "14rem",
              border: "1px solid gray",
              width: "9rem",
              height: "4rem",
              borderRadius: ".6rem",
              color: "black",
              boxShadow: "0 0 3px gray",
            }}
            onClick={() => handleDismissButton()}
          >
            {"Dismiss"}
          </Button>

          <Button
            disabled={isFormValid ? false : true}
            onClick={() => sendFeedBack()}
            sx={{
              position: "absolute",
              top: "33rem",
              left: isMobileScreen ? "11rem" : "30rem",
              border: "1px solid gray",
              width: "9rem",
              height: "4rem",
              borderRadius: ".6rem",
              color: "white",
              boxShadow: "0 0 3px gray",
              backgroundColor: "#47046e",
            }}
          >
            {"Send Feedback"}
          </Button>
         </Box>
      </Modal>
    </div>
  );
}
