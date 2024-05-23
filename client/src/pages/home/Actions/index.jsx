import { useMediaQuery, Popover, Box, Typography } from "@mui/material";
import { Space } from "../../../components";
import React, { useEffect, useState } from "react";
import { addcircle, dragIndicator, noteCards } from "./assets";
import { fetchData, postData, updateData } from "../../../utils";
import { PopoverContainer } from "../../../components";
import { useSelector, useDispatch } from "react-redux";

import SpaceList from "./SpaceList";
import SpaceModals from "./SpaceModals";
import SpaceCreate from "./SpaceCreate";
import PopOver from "./PopOver";

import {
  handleSpaceText,
  handleInputValue,
  shouldSpaceTextSubmit,
  sendSpaceObjectId,
} from "../../../Redux/createSpace";

export default function index() {
  const [isOpenModal, setOpenModal] = useState(false);
  const [isRenameSpaceOpen, setRenameSpaceOpen] = useState(false);
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [ObjectId, setObjectId] = useState("");
  const [spaces, setSpaces] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [countSpaces, setCountSpaces] = useState();

  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const isMobileScreen = useMediaQuery("(max-width:400px)");
  const LengthOfText = text.length;
  const LengthOfEditText = editText.length;
  const isSpaceTextSubmit = useSelector(
    (state) => state.createSpace.isSpaceTextSubmit
  );
  const ObjectIdOfSpace = useSelector(state => state.createSpace.spaceObjectId)
  const spaceText = useSelector((state) => state.createSpace.spaceText);
  let spaceId;
  let spaceObjectId;

  console.log('ObjectIdSpace:',ObjectIdOfSpace)
  console.log('spaceObjectId:',spaceObjectId)
  console.log('objectId:',ObjectId)
  console.log(anchorEl)

  spaces.map((data) => {
    spaceId = data?._id;
  });

  spaces[0]?.Spaces.map((data) => {
    if (spaceText === data?.text) {
      spaceObjectId = data?._id;
      setObjectId(data?._id)
    }
  });

  dispatch(handleSpaceText(editText));
 
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleButtonClicked = () => {
    setOpenModal(true);
    if (spaces.length === 0) {
      dispatch(shouldSpaceTextSubmit(true));
    }
  };

  const renameSpaceText = async (e) => {
    e?.preventDefault();
    updateData("http://localhost:3004/renamespacetext", {
      documentId: spaceId,
      text: editText,
      objectId: ObjectId,
    });
    setCountSpaces(Math.floor(Math.random() * 99));
  };

  const handleRenameSpace = () => {
    setRenameSpaceOpen(true);
    handleClose();
    dispatch(sendSpaceObjectId(spaceObjectId));
    dispatch(handleSpaceText(editText));
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

  const handleAddSpaceText = async (e) => {
    e?.preventDefault();
    updateData("http://localhost:3004/addspacetext", {
      text: text,
      documentId: spaceId,
    });
  };

  const handleDeleteSpace = async (e) => {
    e?.preventDefault();
    updateData("http://localhost:3004/deletespace", {
      documentId: spaceId,
      objectId: spaceObjectId,
      text: editText,
    });
    handleClose();
    setCountSpaces(Math.floor(Math.random() * 99));
  };

  useEffect(() => {
    fetchData("http://localhost:3004/getspacetext", setSpaces);
  },[countSpaces])

  const handleCloseSave = (e) => {
    e?.preventDefault();
    handleNewUserId();
    dispatch(handleInputValue(text));
    isSpaceTextSubmit && handleSpaceTextSubmit();
    handleAddSpaceText();
    setOpenModal(false);
    setText("");
    setCountSpaces(Math.floor(Math.random() * 99));

    dispatch(shouldSpaceTextSubmit(false));
  };

  const handleCloseEditSpace = () => {
    renameSpaceText();
    setRenameSpaceOpen(false);
    setEditText("");
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
      <PopOver
        Popover={Popover}
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        isMobileScreen={isMobileScreen}
        PopoverContainer={PopoverContainer}
        renameButtonStyle={renameButtonStyle}
        handleRenameSpace={handleRenameSpace}
        deleteButonStyle={deleteButonStyle}
        handleDeleteSpace={handleDeleteSpace}
      />

      <SpaceCreate
        createSpaceStyle={createSpaceStyle}
        handleButtonClicked={handleButtonClicked}
        isMobileScreen={isMobileScreen}
        addcircle={addcircle}
        Box={Box}
        Typography={Typography}
      />

      <SpaceModals
        handleChange={handleChange}
        setOpenModal={setOpenModal}
        isOpenModal={isOpenModal}
        textFieldStyle={textFieldStyle}
        MobileSpaceModal={MobileSpaceModal}
        LengthOfEditText={LengthOfEditText}
        LengthOfText={LengthOfText}
        handleCloseEditSpace={handleCloseEditSpace}
        handleEditChange={handleEditChange}
        setRenameSpaceOpen={setRenameSpaceOpen}
        isRenameSpaceOpen={isRenameSpaceOpen}
        editText={editText}
        handleCloseSave={handleCloseSave}
      />

     <SpaceList
        spaces={spaces}
        isMobileScreen={isMobileScreen}
        setEditText={setEditText}
        editText={editText}
        noteCards={noteCards}
        Space={Space}
        setAnchorEl={setAnchorEl}
      />
    </>
  );
}
