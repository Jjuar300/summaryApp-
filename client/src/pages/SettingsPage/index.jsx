import { UserAvatar, NavBar } from "../../components";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  TextField,
  Typography,
  Button,
  Modal,
  useMediaQuery,
} from "@mui/material";
import { feedBack, shieldCheck } from "./assets";
import { useState } from "react";
import DeleteModal from "../../components/Modal";

export default function index() {
  const { user } = useUser();
  const FirstName = user.firstName.charAt(0).toUpperCase();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState();
  const isMobileScreen = useMediaQuery("(max-width:400px)");

  const DesktopDeleteAccountModal = {
    position: "absolute",
    backgroundColor: "white",
    width: "25rem",
    height: "23rem",
    left: "50rem",
    top: "15rem",
    borderRadius: "1rem",
  };

  const MobileDeleteAccountModal = {
    position: "absolute",
    backgroundColor: "white",
    width: "25rem",
    height: "23rem",
    top: "10rem",
    borderRadius: "1rem",
  };

  const UserAvatarStyle = {
    ":hover": { cursor: "pointer" },
    color: "white",
    backgroundColor: "orange",
    top: "3rem",
    width: "6rem",
    height: "6rem",
    fontSize: "2rem",
    left: "8rem",
  };

  const handleUserDelete = () => {
    user?.delete();
    navigate("/");
  };

  const rightButtonStyle = {
    position: "absolute",
    top: "15rem",
    left: "17rem",
    backgroundColor: "#f66e7a",
    color: "white",
    width: "6rem",
  };

  return (
    <>
      <NavBar />
      <UserAvatar inlineStyle={UserAvatarStyle} Text={FirstName} />

      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          top: "17rem",
          left: "2rem",
        }}
      >
        <Box>
          <Typography>Email</Typography>
          <TextField
            disabled
            sx={{
              width: "18rem",
              border: "none",
            }}
            placeholder={`${user.emailAddresses}`}
          />
        </Box>

        <Box>
          <Typography>FullName</Typography>
          <TextField
            disabled
            sx={{
              width: "18rem",
            }}
            placeholder={`${user.fullName}`}
          />
        </Box>

        <Divider
          sx={{
            position: "absolute",
            width: "25rem",
            left: "-2rem",
            top: "13rem",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: "15rem",
            display: "flex",
            flexDirection: "column",
          }}
        ></Box>

        <Typography
          onClick={() => setOpen(true)}
          sx={{
            position: "absolute",
            top: "22rem",
            left: "1rem",
            color: "#4c4e4d",
            ":hover": {
              cursor: "pointer",
              color: "#252625",
            },
          }}
        >
          Delete account
        </Typography>
      </Box>
      {isMobileScreen ? (
        <DeleteModal
          isText={true}
          textQuestion={"Are your sure you want to delete your Account?"}
          textInformation={
            "Deleting your account will remove all information and data. "
          }
          textLeftButton={"Cancel"}
          textRightButton={"Delete"}
          isOpen={isOpen}
          setOpen={setOpen}
          onClick={handleUserDelete}
          inlineStyle={MobileDeleteAccountModal}
          rightButtonStyle={rightButtonStyle}
        />
      ) : (
        <DeleteModal
          isText={true}
          textQuestion={"Are your sure you want to delete your Account?"}
          textInformation={
            "Deleting your account will remove all information and data. "
          }
          textLeftButton={"Cancel"}
          textRightButton={"Delete"}
          isOpen={isOpen}
          setOpen={setOpen}
          onClick={handleUserDelete}
          inlineStyle={DesktopDeleteAccountModal}
          rightButtonStyle={rightButtonStyle}
        />
      )}
    </>
  );
}
