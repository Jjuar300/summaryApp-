import { Box, Button, Modal, TextField } from "@mui/material";
import { setFeedBackOpen, setNotify } from "../../Redux/feedBack";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function index() {
  const isFeedBackModalOpen = useSelector((state) => state.feedBack.isOpen);
  const dispatch = useDispatch();
  const [textArea, setTextArea] = useState("");
  const [formInput, setFormInput] = useState({
    name:'', 
    email: '', 
    subject: '', 
    textArea: '',  
  })
  const [isFormValid, setFormValid] = useState(true); 

  function activateFeed() {
    // setTextArea('')
    dispatch(setNotify(true));
    setTimeout(() => {
      dispatch(setNotify(false));
    }, 3000);
  }
  function sendFeedBack() {
    dispatch(setFeedBackOpen(false));
    activateFeed();
  }

  const textAreaOnChange = (e) => {
    setFormInput({textArea: e.target.value})
  };


  const nameOnChange = (e) => {
    setFormInput({name: e.target.value})
  };

  
  const emailOnChange = (e) => {
    setFormInput({email: e.target.value})
  };

  
  const subjectOnChange = (e) => {
    setFormInput({subject: e.target.value})
  };

  // const isTextAreaWithNoSpaces = formInput?.textArea?.replace(/\s+/g, "");
  // const isNameInput = formInput?.name?.replace(/\s+/g, "");
  // const isEmailInput = formInput?.email?.replace(/\s+/g, "");
  // const isSubjectInput = formInput?.subject?.replace(/\s+/g, "");

  // function isFormfilled(){
  //  formInput.name === ''; 
  // }; 

  for(const [key, value] of Object.entries(formInput)){
      const isNoSpaces = formInput?.key?.replace(/\s+/g, "");
      console.log('isNoSpsace:', isNoSpaces)
  }

  const handleChange = (e) => {
    const {name, value} = e.target; 
    setFormInput(prev => ({...prev, [name]: value}))
  
  }

  useEffect(() =>{ 
    const allFilled = Object.values(formInput).every(value => value.trim() === ''); 
    setFormValid(allFilled)
  },[formInput])

  console.log('isFormValid:', isFormValid)

  return (
    <div>
      <Modal open={isFeedBackModalOpen}>
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "white",
            height: "70vh",
            width: "80vw",
            left: "1.5rem",
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
              left: "4rem",
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
              width: "70vw",
              left: "1rem",
              fontSize:'1.2'
            }}
          >
            <TextField name="name" inputProps={{maxLength: '10'}} onClick={(e) => handleChange(e)} value={formInput.name}  placeholder="Name" type="text" />
            <TextField inputProps={{maxLength: '40'}}  onClick={(e) => handleChange(e)} value={formInput?.email} placeholder="Email" type="email" />
            <TextField inputProps={{maxLength: '40'}}  onClick={(e) => handleChange(e)} value={formInput?.subject} placeholder="Subject" type="text" />
          </Box>

          <textarea
            placeholder="Enter message"
            maxLength={80}
            onChange={(e) => handleChange(e)} value={formInput?.textArea}
            style={{
              position: "relative",
              outline: "none",
              width: "18rem",
              height: "10rem",
              left: "1.4rem",
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
              left: "17.5rem",
            }}
          >
            {formInput?.textArea?.length}/80
          </span>

          <Button
            sx={{
              position: "absolute",
              top: "33rem",
              left: "1rem",
              border: "1px solid gray",
              width: "9rem",
              height: "4rem",
              borderRadius: ".6rem",
              color: "black",
              boxShadow: "0 0 3px gray",
            }}
            onClick={() => dispatch(setFeedBackOpen(false))}
          >
            {"Dismiss"}
          </Button>
          
          <Button
            disabled={isFormValid}
            onClick={() => sendFeedBack()}
            sx={{
              position: "absolute",
              top: "33rem",
              left: "11rem",
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
