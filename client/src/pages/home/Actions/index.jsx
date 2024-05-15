import { Button, useMediaQuery, Popover, Box, Typography } from "@mui/material";
import { Space } from "../../../components";
import SpaceModal from "../../../components/Modal";
import { v4 as uuidv4 } from "uuid";

import React, { useEffect, useState, useRef } from "react";

import { addcircle, dragIndicator, edit, noteCards } from "./assets";

import { fetchData, postData, updateData, deleteData } from "../../../utils";

import { PopoverContainer } from "../../../components";

import { useSelector, useDispatch } from "react-redux";
import {
  handleSpaceText,
  handleInputValue,
  shouldSpaceTextSubmit,
} from "../../../Redux/createSpace";

export default function index() {
  const [isOpenModal, setOpenModal] = useState(false);
  const [isRenameSpaceOpen, setRenameSpaceOpen] = useState(false);
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [spaces, setSpaces] = useState([]);
  const isMobileScreen = useMediaQuery("(max-width:400px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [countSpaces, setCountSpaces] = useState(0);
  const SpacesLength = spaces[0]?.Spaces.length;
  const LengthOfText = text.length;
  const LengthOfEditText = editText.length;
  const spaceTextValue = useSelector((state) => state.createSpace.inputValue);
  const isSpaceTextSubmit = useSelector(
    (state) => state.createSpace.isSpaceTextSubmit
  );
  const dispatch = useDispatch();
  const uniqueId = uuidv4();

  let spaceId;
  let spaceText;
  let spaceObjectId; 

  spaces.map((data) => {
    if (spaceTextValue === data?.Spaces[0]?.text) {
      spaceText = data?.Spaces[0]?.text;
    }

    spaceId = data?._id;
    console.log(data?.Spaces);

  });

  spaces[0]?.Spaces.map((data) => {
    if(editText === data?.text){
      spaceObjectId = data?._id; 
    }
  })

  dispatch(handleSpaceText(spaceText));

  console.log(spaceId);
  console.log(spaceText);
  console.log(spaceTextValue);
  console.log(isSpaceTextSubmit);
  console.log(editText)
  console.log(spaceObjectId)
  // console.log(spaces[0]?.Spaces[0]._id)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(text);
  console.log(spaces);

  const handleButtonClicked = () => {
    setOpenModal(true);
    if(spaces.length === 0){
      dispatch(shouldSpaceTextSubmit(true));
      console.log('spaceTextInput true')
    }
  };

  const handleRenameSpace = () => {
    setRenameSpaceOpen(true);
    handleClose();
  };

  const handleNewUserId = () => {
    postData("http://localhost:3004/postnewuserid", { userId: spaceId });
  };

  const handleSpaceTextSubmit = async (e) => {
    e?.preventDefault();
    postData("http://localhost:3004/postspacetext", {
      text: text,
    });
  };

  const handleEditSpaceText = async (e) => {
    e?.preventDefault();
    updateData("http://localhost:3004/editspacetext", {
      text: text,
      documentId: spaceId,
    });
  };

  const handleDeleteSpace = async (e) => {
    e?.preventDefault();
    deleteData("http://localhost:3004/deletespace", {
        id:spaceObjectId, 
    });
    handleClose();
    setCountSpaces(countSpaces - 1);
  };

  useEffect(() => {
    fetchData("http://localhost:3004/getspacetext", setSpaces);
  },[countSpaces]);


  const handleCloseSave = (e) => {
    e?.preventDefault(); 
    handleNewUserId();
    dispatch(handleInputValue(text));
    isSpaceTextSubmit && handleSpaceTextSubmit(); 
    handleEditSpaceText();
    setOpenModal(false);
    setText("");
    setCountSpaces(countSpaces + 1);

    dispatch(shouldSpaceTextSubmit(false));
  };


  const handleCloseEditSpace = () => {
    handleEditSpaceText();
    setRenameSpaceOpen(false);
    setEditText("");
    // setCountSpaces(spaceTextValue);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const createSpaceStyle = {
    display: "flex",
    position: "relative",
    top: "10rem",
    left: isMobileScreen ? "-.6rem" : "-.3rem",
    ":hover": {
      cursor: "pointer",
      background: "#fefefe",
    },
    width: "10rem",
    padding: ".5rem",
    paddingRight: isMobileScreen ? "11.4rem" : "3rem",
    paddingLeft: isMobileScreen ? "3rem" : "1.5rem",
    transition: "background .2s ease-in-out",
    opacity: ".6",
    fontSize: "1.2rem",
  };

  const MobileSpaceModal = {
    position: "absolute",
    backgroundColor: "white",
    width: "25rem",
    height: "15rem",
    top: isMobileScreen ? "10rem" : "20rem",
    borderRadius: "1rem",
    left: isMobileScreen ? null : "45rem",
  };

  const textFieldStyle = {
    position: "absolute",
    top: "6rem",
    left: "2rem",
    width: "20rem",
  };

  const renameButtonStyle = {
    color: "#747573",
    textTransform: "none",
  };

  const deleteButonStyle = {
    color: "#ff6f82",
    textTransform: "none",
  };

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          display: "flex",
          flexDirection: "row",
          left: isMobileScreen ? "-3rem" : "-4rem",
          width: "22rem",
          textTransform: "",
        }}
      >
        <PopoverContainer
          text={"Rename"}
          buttonStyle={renameButtonStyle}
          submitOnClick={handleRenameSpace}
        />
        <PopoverContainer
          text={"Delete"}
          buttonStyle={deleteButonStyle}
          submitOnClick={handleDeleteSpace}
        />
      </Popover>

      <Box sx={createSpaceStyle}>
        <Typography>Browse Space</Typography>
      </Box>

      <Box onClick={handleButtonClicked} sx={createSpaceStyle}>
        <Typography>Create Space</Typography>

        <Box
          sx={{
            position: "relative",
            left: isMobileScreen ? "13rem" : "6rem",
          }}
        >
          <img src={`${addcircle}`} />
        </Box>
      </Box>

      <SpaceModal
        onClick={handleCloseSave}
        onChange={handleChange}
        textQuestion={"Create a new Space"}
        isText={true}
        inputStyle={textFieldStyle}
        isInput={true}
        isOpen={isOpenModal}
        textLeftButton={"Cancel"}
        textRightButton={"Save"}
        setOpen={setOpenModal}
        inlineStyle={MobileSpaceModal}
        textCount={LengthOfText}
      />

      <SpaceModal
        onClick={handleCloseEditSpace}
        onChange={handleEditChange}
        setOpen={setRenameSpaceOpen}
        textQuestion={"Edit Space"}
        textLeftButton={"Cancel"}
        textRightButton={"Save"}
        isInput={true}
        isOpen={isRenameSpaceOpen}
        inlineStyle={MobileSpaceModal}
        inputStyle={textFieldStyle}
        isText={true}
        previousText={editText}
        textCount={LengthOfEditText}
      />

      {spaces.map((data) =>
        data.Spaces.map((data) => (
          <Space
            key={data?.id}
            text={data?.text}
            inlineStyle={{
              display: "flex",
              position: "relative",
              top: "11rem",
              left: "-0.5rem",
              ":hover": {
                cursor: "pointer",
                background: "#ededed",
              },
              width: "12rem",
              padding: ".5rem",
              paddingRight: isMobileScreen ? "11.4rem" : "1.3rem",
              paddingLeft: isMobileScreen ? "4rem" : "3rem",
              transition: "background .2s ease-in-out",
              opacity: ".8",
              fontSize: "1.2rem",
              backgroundColor: editText === data?.Text && "#ededed",
              borderRight: editText === data?.Text && "3px solid gray",
            }}
            isSpaceIcon={true}
            rightSpaceIcon={dragIndicator}
            leftSpaceIcon={noteCards}
            rightSpaceIconClick={handleClick}
            setState={setEditText}
          />
        ))
      )}
    </>
  );
}
