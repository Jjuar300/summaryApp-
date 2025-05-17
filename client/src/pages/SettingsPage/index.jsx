import { UserAvatar, NavBar } from "../../components";
import { useUser, useClerk } from "@clerk/clerk-react";
import {
  Box,
  Divider,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import DeleteModal from "../../components/Modal";
import { deleteData, postData } from "../../utils";
import { useGetData } from "../../hooks/index";
import { isUserCreated } from "../../Redux/imageContainer";
import { useDispatch } from "react-redux";

export default function index() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isOpen, setOpen] = useState();
  const isMobileScreen = useMediaQuery("(max-width:430px)");
  const FirstName = user.firstName.charAt(0).toUpperCase();
  const { space } = useGetData();
  const dispatch = useDispatch();

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
    height: "20rem",
    top: "10rem",
    borderRadius: "1rem",
    left: "1rem",
  };

  const UserAvatarStyle = {
    ":hover": { cursor: "pointer" },
    color: "white",
    backgroundColor: "orange",
    top: "-9rem",
    width: "5.5rem",
    height: "5.5rem",
    fontSize: "2rem",
    left: "17rem",
  };

  const handleUserDelete = async () => {
    postData("/api/imagekitfolder", {
      folderName: user?.id,
    });
    dispatch(isUserCreated(true));
    await user?.delete();
    await deleteData(`/api/users/${user?.id}`, {
      space,
    });
    await signOut();
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
      <Box
        sx={{
          position: "absolute",
          top: "0.1rem",
          left: ".1rem",
          backgroundColor: "white",
          width: "99.4vw",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "#e3e3e3",
            width: "25rem",
            height: "25rem",
            left: "1rem",
            top: "6rem",
            borderRadius: "1rem",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "10rem",
              left: "2rem",
            }}
          >
            <h2
              style={{
                fontFamily: "DM Sans",
                color: "#2e2e2e",
              }}
            >
              Personal info
            </h2>
            <h3
              style={{
                position: "relative",
                fontFamily: "DM Sans",
                color: "#515151",
                width: "12rem",
              }}
            >
              Update your photo and your personal info here.
            </h3>
          </Box>

          <Box
            sx={{
              position: "absolute",
            }}
          >
            <h2
              style={{
                position: "relative",
                fontFamily: "DM Sans",
                color: "#2e2e2e",
                fontSize: "1.2rem",
                left: "1.5rem",
              }}
            >
              First name
            </h2>
            <TextField
              value={user.firstName}
              sx={{
                "& .MuiOutlinedInput-root": {
                  position: "relative",
                  top: "-1rem",
                  borderRadius: "2rem",
                  left: "1rem",
                  fontSize: "1.2rem",
                  width: "10rem",
                  height: "3rem",
                },
              }}
            />
          </Box>

          <Box
            sx={{
              position: "absolute",
              left: "12rem",
            }}
          >
            <h2
              style={{
                position: "relative",
                fontFamily: "DM Sans",
                color: "#2e2e2e",
                fontSize: "1.2rem",
                left: "1.5rem",
              }}
            >
              Last name
            </h2>
            <TextField
              value={user.lastName}
              sx={{
                "& .MuiOutlinedInput-root": {
                  position: "relative",
                  top: "-1rem",
                  borderRadius: "2rem",
                  left: "1rem",
                  fontSize: "1.2rem",
                  width: "10rem",
                  height: "3rem",
                },
              }}
            />
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: "17rem",
            }}
          >
            <h2
              style={{
                position: "relative",
                fontFamily: "DM Sans",
                color: "#2e2e2e",
                fontSize: "1.2rem",
                left: "1.5rem",
              }}
            >
              Primary Email
            </h2>
            <TextField
              disabled={true}
              value={user.primaryEmailAddress}
              sx={{
                "& .MuiOutlinedInput-root": {
                  position: "relative",
                  top: "-1rem",
                  borderRadius: "2rem",
                  left: "1rem",
                  fontSize: "1.2rem",
                  width: "23rem",
                  height: "3rem",
                },
              }}
            />
          </Box>

          <UserAvatar inlineStyle={UserAvatarStyle} Text={FirstName} />
        </Box>

        <NavBar />

        <Box
          sx={{
            position: "absolute",
            backgroundColor: "#e3e3e3",
            width: "25rem",
            height: "15rem",
            left: "1rem",
            top: "35rem",
            borderRadius: "1rem",
          }}
        >
          <Box
          sx={{
            position:'relative', 
            width:'12rem', 
            left:'2rem', 
          }}
          >
            <h2
              style={{
                fontFamily: "DM Sans",
                color: "#2e2e2e",
              }}
            >
              Account Deletion
            </h2>

            <h3
              style={{
                position: "relative",
                fontFamily: "DM Sans",
                color: "#515151",
                width: "12rem",
              }}
            >
              This action is permannent and cannot be undone
            </h3>
          </Box>

        <Typography
          onClick={() => setOpen(true)}
          sx={{
            position: "relative",
            top: "-10rem",
            left: "13rem",
            color: "#f8536c",
            width:'10rem',
            height:'3rem', 
            borderRadius:'2rem',  
            backgroundColor: '#cdcdcd', 
            textAlign:'center', 
            fontSize:'1.1rem', 
            ":hover": {
              cursor: "pointer",
              color: "#252625",
            },
          }}
        >
          <span
          style={{
            position:'relative', 
            top:'.6rem', 
          }}
          >Delete account</span>
        </Typography>
        </Box>

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
          setOpenModal={() => setOpen(false)}
          onClick={handleUserDelete}
          inlineStyle={MobileDeleteAccountModal}
          rightButtonStyle={rightButtonStyle}
        />
      ) : (
        <DeleteModal
          isInput={false}
          isText={true}
          textQuestion={"Are your sure you want to delete your Account?"}
          textInformation={
            "Deleting your account will remove all information and data. "
          }
          textLeftButton={"Cancel"}
          textRightButton={"Delete"}
          isOpen={isOpen}
          onClick={handleUserDelete}
          setOpenModal={() => setOpen(false)}
          inlineStyle={DesktopDeleteAccountModal}
          rightButtonStyle={rightButtonStyle}
        />
      )}
    </>
  );
}
