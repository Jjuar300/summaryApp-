import { useMediaQuery, Popover } from "@mui/material";
import { Space } from "../../../components";
import { useEffect, useState } from "react";
import { fetchData, postData, updateData } from "../../../utils";
import { PopoverContainer } from "../../../components";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@clerk/clerk-react";

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

export default function Index() {
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
  const { user } = useUser()

  const objectId = useSelector((state) => state.createSpace.ObjectId);
  const spaceText = useSelector((state) => state.createSpace.spaceText);

  let spaceId;
  let spaceObjectId;

 console.log(spaces)

  // spaces.map((data) => {
  //   spaceId = data?._id;
  // });

  // spaces[0]?.Spaces.map((data) => {
  //   if (spaceText === data?.text) {
  //     spaceObjectId = data?._id;
  //   }
  // });

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
    updateData("/api/renamespacetext", {
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


  const handleSpaceTextSubmit = async (e) => {
    e?.preventDefault();
    postData("/api/spaces", {
      name: text,
      userId: user?.id,
    });
    getUserData(); 
  };

  // const handleAddSpaceText = async (e) => {
  //   e?.preventDefault();
  //   updateData("/api/addspacetext", {
  //     text: text,
  //     documentId: spaceId,
  //   });
  // };

  const handleDeleteSpace = async (e) => {
    e?.preventDefault();
    updateData("/api/deletespace", {
      documentId: spaceId,
      objectId: objectId,
      text: editText,
    });
    handleClose();
    setCountSpaces(Math.floor(Math.random() * 99));
    dispatch(handleSpaceText(""));
  };
  
  const getUserData = async () => {
    const response = await fetchData(`/api/users/${user.id}`);
    if(response.spaces){
      setSpaces(response.spaces); 
    }
  }

  useEffect(() => {
   getUserData(); 

  }, []);

  const handleCloseSave = (e) => {
    e?.preventDefault();
    dispatch(handleInputValue(text));
    handleSpaceTextSubmit();
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
