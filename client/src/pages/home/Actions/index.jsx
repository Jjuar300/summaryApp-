import { useMediaQuery, Popover, Box, Typography } from "@mui/material";
import { Space } from "../../../components";
import SpaceModal from "../../../components/Modal";

import React, { useEffect, useState, useRef } from "react";

import { addcircle, dragIndicator, noteCards } from "./assets";

import { fetchData, postData, updateData, deleteData } from "../../../utils";

import { PopoverContainer } from "../../../components";

export default function index() {
  const [isBrowserClicked, setBrowserClicked] = useState(false);
  const [isOpenModal, setOpenModal] = useState(false);
  const [isRenameSpaceOpen, setRenameSpaceOpen] = useState(false);
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [spaces, setSpaces] = useState([]);
  const [spaceText, setSpaceText] = useState("");
  const isMobileScreen = useMediaQuery("(max-width:400px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [countSpaces, setCountSpaces] = useState(0);
  const SpacesLength = spaces.length;

  console.log(spaceText);
  console.log(countSpaces);
  let spaceId;
  spaces.map((data) => {
    if (spaceText === data?.Text) {
      spaceId = data?._id;
    }
  });

  console.log(spaceId);
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
  };

  const handleRenameSpace = () => {
    setRenameSpaceOpen(true);
    handleClose();
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
      text: editText,
      id: spaceId,
    });
  };

  const handleDeleteSpace = async (e) => {
    e?.preventDefault();
    deleteData("http://localhost:3004/deletespace", {
      id: spaceId,
    });
    handleClose();
    setCountSpaces(SpacesLength - 1);
  };

  useEffect(() => {
    fetchData("http://localhost:3004/getspacetext", setSpaces);
  }, [countSpaces]);

  const handleCloseSave = () => {
    handleSpaceTextSubmit();
    handleEditSpaceText();
    setOpenModal(false);
    setText("");
    setCountSpaces(SpacesLength + 1);
  };

  const handleCloseEditSpace = () => {
    handleEditSpaceText();
    setRenameSpaceOpen(false);
    setEditText("");
    setCountSpaces(spaceText);
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
        previousText={spaceText}
      />

      {spaces.map((data) => (
        <Space
          key={data?.id}
          text={data.Text}
          inlineStyle={{
            display: "flex",
            position: "relative",
            top: "11rem",
            left: "-0.5rem",
            ":hover": {
              cursor: "pointer",
              background: "#fefefe",
            },
            width: "10rem",
            padding: ".5rem",
            paddingRight: isMobileScreen ? "11.4rem" : "3rem",
            paddingLeft: isMobileScreen ? "4rem" : "3rem",
            transition: "background .2s ease-in-out",
            opacity: ".8",
            fontSize: "1.2rem",
            backgroundColor: spaceText === data?.Text && "#fefefe",
            borderRight: spaceText === data?.Text && "3px solid gray",
          }}
          isSpaceIcon={true}
          rightSpaceIcon={dragIndicator}
          leftSpaceIcon={noteCards}
          rightSpaceIconClick={handleClick}
          setState={setSpaceText}
        />
      ))}
    </>
  );
}
