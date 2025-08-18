import { Box, Button, Popover } from "@mui/material";
import { UserAvatar, PopoverContainer } from "../../../components";
import { useUser, SignOutButton, useClerk } from "@clerk/clerk-react";
import { useState } from "react";
import { settings, feedBack, logout } from "./assets";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { postData } from "../../../utils";
import { useDispatch } from "react-redux";
import { sendObjectId } from "../../../Redux/createSpace";
import { setOnClick } from "../../../Redux/feedBack";
import { boxStyle, buttonStyle } from "./styles/index";
import { setFeedBackOpen } from "../../../Redux/feedBack";
import { setSessionStatus } from "../../../Redux/Stripe";

export default function Index() {
  const {signOut} = useClerk(); 
  const { user, isSignedIn } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const userEmail = user.primaryEmailAddress.emailAddress;
  const FirstName = user.firstName.charAt(0).toUpperCase();
  const userId = user?.id;
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery("(max-width:430px)");


  const handleSignOut = async () =>{ 
    try {
      dispatch(setSessionStatus(false))
      await signOut(); 
   if(!isSignedIn) return navigate('http://localhost:5173/noto')
    } catch (error) {
      console.log('error ::33', error)
    }
  }; 

  const UserAvatarStyle = {
    height: "3rem",
    width: "3rem",
    backgroundColor: "#c8a99f",
  };

  const getUserData = async () => {
    await postData("/api/users", {
      email: userEmail,
      userId: userId,
    });
  };

  getUserData();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnClick = () => {
    handleSignOut();
    dispatch(sendObjectId(null));
    if (isSignedIn) {
      dispatch(setOnClick(true));
    } 
  };

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          borderRadius: "50%",
          border: "7px solid transparent",
          top: isMobileScreen ? "54rem" : "55rem",
          left: isMobileScreen ? "15rem" : "11rem",
          width: "3rem",
          height: "3rem",
          transition: "all 0.3s ease",
          "&:hover": {
            cursor: "pointer",
            border: "7px solid #cac9c9", // Or your desired hover border
          },
        }}
      >
        
        <UserAvatar
          Text={FirstName}
          submitOnClickFunction={handleClick}
          inlineStyle={UserAvatarStyle}
        />
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          left: isMobileScreen ? "1rem" : "4rem",
          top: isMobileScreen ? "-5rem" : "0rem",
          width: "12rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "12rem",
            gap: "1rem",
          }}
        >
          <PopoverContainer
            imageIcon={settings}
            text={"Settings"}
            submitOnClick={() => navigate("/settings")}
            boxStyle={boxStyle}
            buttonStyle={buttonStyle}
            isIcon={true}
          />

          <PopoverContainer
            submitOnClick={() => dispatch(setFeedBackOpen(true))}
            imageIcon={feedBack}
            text={"Feedback"}
            boxStyle={boxStyle}
            buttonStyle={buttonStyle}
            isIcon={true}
          />
          
          <SignOutButton signOutOptions={{redirectUrl: '/Noto'}} >
            <Box
              sx={{
                position: "relative",
                display: "flex",
                left: "1rem",
              }}
            >
              <img style={{ width: "1.2rem" }} src={`${logout}`} />
              <Button
                onClick={handleOnClick}
                sx={{
                  fontSize: "1rem",
                  color: "black",
                  width: "10rem",
                  left: "-2rem",
                }}
              >
                Logout
              </Button>
            </Box>
          </SignOutButton>
        </Box>
      </Popover>
    </>
  );
}
