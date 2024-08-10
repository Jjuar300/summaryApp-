import { useMediaQuery, Popover } from "@mui/material";
import { Space } from "../../../components";
import { useState } from "react";
import { deleteData, postData, updateData } from "../../../utils";
import { PopoverContainer, FeedbackAd } from "../../../components";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useGetData } from "../../../hooks";

import SpaceList from "./SpaceList";
import SpaceModals from "./SpaceModals";
import SpaceCreate from "./SpaceCreate";
import PopOver from "./PopOver";

import {
  handleSpaceText,
  handleInputValue,
  sendSpaceObjectId,
  sendObjectId,
} from "../../../Redux/createSpace";

export default function Index() {
  const [isOpenModal, setOpenModal] = useState(false);
  const [isRenameSpaceOpen, setRenameSpaceOpen] = useState(false);
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const isMobileScreen = useMediaQuery("(max-width:400px)");
  const LengthOfText = text.length;
  const LengthOfEditText = editText.length;

  const navigate = useNavigate();
  const { user } = useUser();
  const { space, getUserData } = useGetData();

  const objectId = useSelector((state) => state.createSpace.ObjectId);
  const chatgptId = useSelector((state) => state.chatGpt.chatgptId);

  let spaceObjectId;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleButtonClicked = () => {
    setOpenModal(true);
  };

  const renameSpaceText = async (e) => {
    e?.preventDefault();
    try {
      await updateData(`/api/spaces/${objectId}`, {
        newName: editText,
      });
      getUserData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRenameSpace = () => {
    setRenameSpaceOpen(true);
    handleClose();
    dispatch(sendSpaceObjectId(spaceObjectId));
  };


  const addSpace = async (e) => {
    e?.preventDefault();
    try {
      const response = await postData("/api/spaces", {
        name: text,
        userId: user?.id,
      });
      getUserData();
      const createdSapaceId = response?._id; 
      dispatch(sendObjectId(createdSapaceId))
      navigate(`/spaces/${createdSapaceId}`)

    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSpace = async (e) => {
    e?.preventDefault();
    try {
      await deleteData(`/api/users/${user.id}/spaces/${objectId}`);
      await deleteData(`/api/chatgpt/${chatgptId}`);
      handleClose();
      dispatch(handleSpaceText(""));
      getUserData();
      navigate("/browsespace");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseSave = (e) => {
    e?.preventDefault(); 
    getUserData(); 
    dispatch(handleInputValue(text));
    addSpace();
    setOpenModal(false);
    setText("");
    dispatch(handleSpaceText(text));
  };

  const handleCloseEditSpace = (e) => {
    e?.preventDefault(); 
    renameSpaceText();
    setRenameSpaceOpen(false);
    dispatch(handleSpaceText(editText));
    setEditText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
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

      <SpaceCreate handleButtonClicked={handleButtonClicked} />

      <SpaceModals
        text={text}
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
        spaces={space}
        setEditText={setEditText}
        editText={editText}
        Space={Space}
        setAnchorEl={setAnchorEl}
      />

      <FeedbackAd/>
    </>
  );
}
