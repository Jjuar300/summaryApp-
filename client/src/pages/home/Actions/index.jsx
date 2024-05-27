import { useMediaQuery, Popover, Box, Typography } from "@mui/material";
import { Space } from "../../../components";
import { useEffect, useState } from "react";
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

  const objectId = useSelector((state) => state.createSpace.ObjectId);
  const spaceText = useSelector((state) => state.createSpace.spaceText);

  let spaceId;
  let spaceObjectId;

  spaces.map((data) => {
    spaceId = data?._id;
  });

  spaces[0]?.Spaces.map((data) => {
    if (spaceText === data?.text) {
      spaceObjectId = data?._id;
    }
  });

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
      objectId: objectId,
    });
    setCountSpaces(Math.floor(Math.random() * 99));
  };

  const handleRenameSpace = () => {
    setRenameSpaceOpen(true);
    handleClose();
    dispatch(sendSpaceObjectId(spaceObjectId));
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
      objectId: objectId,
      text: editText,
    });
    handleClose();
    setCountSpaces(Math.floor(Math.random() * 99));
    dispatch(handleSpaceText(""));
  };

  useEffect(() => {
    fetchData("http://localhost:3004/getspacetext", setSpaces);
  }, [countSpaces]);

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

    dispatch(handleSpaceText(text));
  };

  const handleCloseEditSpace = () => {
    renameSpaceText();
    setRenameSpaceOpen(false);
    setEditText("");
    dispatch(handleSpaceText(editText));
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
        setEditText={setEditText}
        editText={editText}
        Space={Space}
        setAnchorEl={setAnchorEl}
      />
    </>
  );
}
