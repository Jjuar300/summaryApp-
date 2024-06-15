import { Box, Button, Popover } from "@mui/material";
import { UserAvatar, PopoverContainer } from "../../../components";
import { useUser, SignOutButton } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { settings, feedBack, logout } from "./assets";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { postData, fetchData } from "../../../utils";
import {
  userAvatarStyle,
  mobileUserAvatarStyle,
  boxStyle,
  buttonStyle,
} from "./styles/index";

export default function Index() {
  
  const { user } = useUser()
  const userEmail = user.primaryEmailAddress.emailAddress; 
  const firstLetterOfEmail = user.primaryEmailAddress.emailAddress.charAt(0).toUpperCase();
  const userId = user?.id; 
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const isMobileScreen = useMediaQuery("(max-width:400px)");
  const open = Boolean(anchorEl);


   const getData = async () => {
      const data = await fetchData(`/api/users/${userId}`); 
      if(!data.userId){
        postData("/api/users", {
          email: userEmail,
          userId: userId,
        });
      }
   
   }
  
   getData(); 


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <UserAvatar
        Text={firstLetterOfEmail}
        submitOnClickFunction={handleClick}
        inlineStyle={isMobileScreen ? mobileUserAvatarStyle : userAvatarStyle}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          left: "4rem",
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
            imageIcon={feedBack}
            text={"Feedback"}
            boxStyle={boxStyle}
            buttonStyle={buttonStyle}
            isIcon={true}
          />

          <SignOutButton>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                left: "1rem",
              }}
            >
              <img style={{ width: "1.2rem" }} src={`${logout}`} />
              <Button
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
