import Actions from "../home/Actions";
import AccountProfile from "../home/AccountProfile";
import searchIcon from "./assets/search.svg";
import exitArrow from "./assets/ExitArrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { useGetData } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { sendObjectId } from "../../Redux/createSpace";
import { setOpen } from "../../Redux/homePage";
import DrawerComp from "../../components/Drawer";
import Feedback from "../../components/FeedBack";
import { setOpen as setFeedbackOpen } from "../../Redux/feedBack";

import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  useMediaQuery,
  Button,
} from "@mui/material";
import { useState } from "react";

export default function Index() {
  const { space } = useGetData();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery("(max-width:430px)");
  const open = useSelector((state) => state.homePage.open);
  const isFeedBackModalOpen = useSelector((state) => state.feedBack.isOpen);

  console.log("isFeedBackOpen:", isFeedBackModalOpen);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filterSpaces = space.filter(({ name }) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  const handleClick = (e, ObjectId) => {
    e?.preventDefault();
    dispatch(sendObjectId(ObjectId));
    navigate(`/spaces/${ObjectId}`);
    dispatch(setOpen(false));
  };

  const userAvatarStyle = {
    position: "relative",
    backgroundColor: "orange",
    top: "55rem",
    left: "11rem",
    width: "3rem",
    height: "3rem",
    fontSize: "1.4rem",
    cursor: "pointer",
  };

  const mobileUserAvatarStyle = {
    position: "absolute",
    backgroundColor: "orange",
    bottom: "1.5rem",
    right: "2rem",
    width: "3rem",
    height: "3rem",
    fontSize: "1.4rem",
  };

  const ModalStyle = {
    position: "absolute",
    backgroundColor: "white",
    height: "50vh",
    width: "80vw",
    left: "2rem",
    top: "10rem",
    outline: "none",
    borderRadius: ".6rem",
    boxShadow: "0 0 60px rgba(176, 172, 172, 0.2)",
  };

  const textareaStyle = {
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
  };

  const feedBackTextStyle = {
    position: "relative",
    color: "#656464",
    left: "2.5rem",
    top: "1rem",
    fontFamily: "Inter",
    fontSize: "1.3rem",
  };

  const dismissButtonStyle = {
    position: "absolute",
    top: "20rem",
    left: "1rem",
    border: "1px solid gray",
    width: "9rem",
    height: "4rem",
    borderRadius: ".6rem",
    color: "black",
    boxShadow: "0 0 3px gray",
  };

  const sendFeedbackButtonStyle = {
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
  };

  return (
    <div>
      {isMobileScreen ? (
        <Feedback
          ModalStyle={ModalStyle}
          FeedBackText={"Send us a feedback!"}
          FeedBackTextStyle={feedBackTextStyle}
          textareaStyle={textareaStyle}
          DismissButtonText={"Dismiss"}
          DismissButtonStyle={dismissButtonStyle}
          SendFeedBackText={"Send feedback"}
          SendFeedBackStyle={sendFeedbackButtonStyle}
          isModalOpen={isFeedBackModalOpen}
        />
      ) : null}

      {isMobileScreen ? (
        <DrawerComp
          open={open}
          avatarStyle={mobileUserAvatarStyle}
          setOpen={setOpen}
          icon={exitArrow}
        />
      ) : null}

      {isMobileScreen ? (
        <Button
          onClick={() => dispatch(setOpen(true))}
          sx={{
            position: "absolute",
            left: "1rem",
            top: "1rem",
            opacity: ".4",
            transform: "rotate(.5turn)",
            zIndex: "999",
          }}
        >
          <img src={`${exitArrow}`} />
        </Button>
      ) : (
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "#F8F5FD",
            width: isMobileScreen ? "23rem" : "16rem",
            height: "59.8rem",
            left: ".2rem",
            top: ".05rem",
            borderTopRightRadius: "1rem",
            borderBottomRightRadius: "1rem",
          }}
        >
          <AccountProfile
            avatarStyle={
              isMobileScreen ? mobileUserAvatarStyle : userAvatarStyle
            }
          />
          <Actions />
        </Box>
      )}

      <Box
        sx={{
          position: "absolute",
          backgroundColor: "#FAF6FF",
          height: isMobileScreen ? "58.3rem" : "58rem",
          borderRadius: isMobileScreen ? "0rem" : "1rem",
          width: isMobileScreen ? "27.8rem" : "98.6rem",
          left: isMobileScreen ? "-1rem" : "17rem",
          top: isMobileScreen ? "-.2rem" : ".5rem",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: isMobileScreen ? "2rem" : "30rem",
            top: "8rem",
            width: isMobileScreen ? "23rem" : "32rem",
          }}
        >
          <Typography
            sx={{
              fontSize: "2rem",
              color: "#757676",
              fontWeight: "bold",
            }}
          >
            Browse All
          </Typography>

          <TextField
            fullWidth
            size="small"
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment sx={{ opacity: ".5" }} position="start">
                  <img src={searchIcon} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box
          sx={{
            position: "absolute",
            left: isMobileScreen ? "4rem" : "30rem",
            top: "17rem",
            width: isMobileScreen ? "20rem" : "0rem",
          }}
        >
          {filterSpaces?.map(({ _id, name }) => (
            <Typography
              onClick={(e) => handleClick(e, _id)}
              sx={{
                fontSize: "1.3rem",
                padding: ".5rem",
                color: "#3f3f3f",
                width: isMobileScreen ? "19rem" : "32rem",
                ":hover": {
                  cursor: "pointer",
                  background: "#ededed",
                },
                transition: "background .2s ease-in-out",
              }}
              key={_id}
            >
              {name}
            </Typography>
          ))}
        </Box>
      </Box>
    </div>
  );
}
