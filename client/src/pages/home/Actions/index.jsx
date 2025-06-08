import { useMediaQuery, Popover, Box } from "@mui/material";
import { Space } from "../../../components";
import { useState } from "react";
import { deleteData, postData, updateData } from "../../../utils";
import { PopoverContainer, FeedbackAd } from "../../../components";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useGetData, useUserNote } from "../../../hooks";
import { setRun } from "../../../Redux/SpaceNotes";
import { setOpenModal } from "../../../Redux/createSpace";

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

export default function Index({ setOpen }) {
  // const [isOpenModal, setOpenModal] = useState(false);
  const [isRenameSpaceOpen, setRenameSpaceOpen] = useState(false);
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const isMobileScreen = useMediaQuery("(max-width:430px)");
  const LengthOfText = text.length;
  const LengthOfEditText = editText.length;
  const isOpenModal = useSelector((state) => state.createSpace.isOpenModal);

  const navigate = useNavigate();
  const { user } = useUser();
  const { space, getUserData } = useGetData();
  const { fetchUserNote } = useUserNote();
  const spaceId = useSelector((state) => state.createSpace.ObjectId);

  const objectId = useSelector((state) => state.createSpace.ObjectId);
  const isSpaceId = space.find((space) => space._id === spaceId);
  let spaceObjectId;

  window.addEventListener("popstate", () => {
    dispatch(setRun(false));
  });

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleButtonClicked = () => {
    getUserData();
    dispatch(setOpenModal(true));
    dispatch(setRun(true));
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
    fetchUserNote();
    try {
      const response = await postData("/api/spaces", {
        name: text,
        userId: user?.id,
      });
      const createdSapaceId = response?._id;
      dispatch(sendObjectId(createdSapaceId));
      navigate(`/spaces/${createdSapaceId}`);
      await postData("/api/userNotes", {
        userId: user?.id,
        spaceId: createdSapaceId,
        content: JSON.stringify(""),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSpace = async (e) => {
    e?.preventDefault();
    try {
      await deleteData(`/api/deleteNote/${isSpaceId?.notes[0]?._id}`);
      await deleteData(`/api/users/${user.id}/spaces/${objectId}`);
      handleClose();
      dispatch(handleSpaceText(""));
      dispatch(setRun(false));
      getUserData();
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseSave = (e) => {
    e?.preventDefault();
    dispatch(handleInputValue(text));
    addSpace();
    setText("");
    dispatch(handleSpaceText(text));
    getUserData();
    dispatch(setOpenModal(false));
  };

  const handleCancelModal = () => {
    setRenameSpaceOpen(false);
    dispatch(setRun(false));
    dispatch(setOpenModal(false));
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
    top: isMobileScreen ? "15rem" : "20rem",
    borderRadius: "1rem",
    left: isMobileScreen ? ".5rem" : "45rem",
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
        setOpenModal={handleCancelModal}
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

      <Box
        sx={{
          overflow: "auto",
          position: "absolute",
          top: "13.7rem",
          height: "38rem",
          width: "16rem",
          scrollbarWidth: "none",
        }}
      >
        <SpaceList
          setOpen={setOpen}
          spaces={space}
          setEditText={setEditText}
          editText={editText}
          Space={Space}
          setAnchorEl={setAnchorEl}
        />
      </Box>

      <FeedbackAd />
    </>
  );
}
