import { UserAvatar, NavBar } from "../../components";
import { useUser, useClerk } from "@clerk/clerk-react";
import { Box, TextField, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteModal from "../../components/Modal";
import { deleteData, postData } from "../../utils";
import { useGetData } from "../../hooks/index";
import {
  isUserCreated,
  setProfileImage,
  setUserCreated,
} from "../../Redux/imageContainer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IKContext, IKUpload } from "imagekitio-react";
import { setSessionStatus } from "../../Redux/Stripe";

export default function Index() {
  const [isOpen, setOpen] = useState();
  const [validateName, setValidateName] = useState(true);
  const [textInput, setTextInput] = useState({
    firstName: "",
    lastName: "",
  });
  const { user } = useUser();
  const { signOut } = useClerk();
  const { space } = useGetData();
  const isMobileScreen = useMediaQuery("(max-width:430px)");
  const FirstName = user.firstName.charAt(0).toUpperCase();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userPaymentMongoDocId = useSelector((state) => state.Stripe.documentId);
  const subscriptionId = useSelector((state) => state.Stripe.subscriptionId);
  const userCustomerId = useSelector((state) => state.Stripe.customerId);
  const productionAPI = import.meta.env.VITE_PRODUCTION_API_URL;

  const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
  const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URLENDPOINT;
  const userId = user?.id;

  console.log("userCustomerId:", userCustomerId);

  const authenticator = async () => {
    try {
      const response = await fetch(`${productionAPI}/authImage`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authenticator request failed: ${error.message} `);
    }
  };

  const onSuccess = (res) => {
    dispatch(setProfileImage(res.filePath));
    dispatch(setUserCreated(false));
  };

  const DesktopDeleteAccountModal = {
    position: "absolute",
    backgroundColor: "white",
    width: "25rem",
    height: "23rem",
    left: "45rem",
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
    width: "5.5rem",
    height: "5.5rem",
    backgroundColor: "#c8a99f",
    fontSize: "1.6rem",
  };

  const cancelPayment = async () => {
    dispatch(setSessionStatus(false));
    fetch(`${productionAPI}/cancel-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        subscriptionId,
        userPaymentMongoDocId,
        userCustomerId,
      }),
    });
  };

  const handleUserDelete = async () => {
    await user?.delete();
    navigate("/Noto");
    cancelPayment();
    postData(
      `${productionAPI}/imagekitfolder`,
      {
        folderName: user?.id,
      },
      "handleUserDelete error ::"
    );
    dispatch(isUserCreated(true));
    dispatch(setUserCreated(true));
    await deleteData(`${productionAPI}/users/${user?.id}`, {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTextInput((prev) => ({ ...prev, [name]: value }));
    if (name === "firstName") setValidateName(value);
  };

  const handleUpdate = async () => {
    try {
      if (!user) return;
      const payload = {
        first_name: textInput.firstName,
        last_name: textInput.lastName,
      };

      await user.update(payload);
      await user?.reload();
    } catch (err) {
      console.error("Error updating name", err);
      if (err?.errors) {
        err.errors.forEach((e) => {
          console.log("handleUpdate error ::", e.long_message);
        });
      }
    }
  };

  useEffect(() => {
    if (user) {
      setTextInput({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
      });
    }
  }, []);

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
            left: isMobileScreen ? "1rem" : "40rem",
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
              name="firstName"
              value={textInput.firstName}
              onChange={(e) => handleChange(e)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  position: "relative",
                  top: "-1rem",
                  borderRadius: "2rem",
                  left: "1rem",
                  fontSize: "1.2rem",
                  width: "10rem",
                  height: "3rem",
                  backgroundColor: validateName ? null : "#f6b6b3",
                  border: validateName ? null : "1px solid red",
                },
              }}
            />

            {validateName ? null : (
              <h2
                style={{
                  position: "relative",
                  fontSize: ".9rem",
                  top: "-2rem",
                  left: "1.5rem",
                  fontFamily: "DM Sans",
                  color: "#ec675f",
                }}
              >
                Please enter a name
              </h2>
            )}
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
              name="lastName"
              value={textInput.lastName}
              onChange={(e) => handleChange(e)}
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

          <IKContext
            urlEndpoint={urlEndpoint}
            publicKey={publicKey}
            authenticator={authenticator}
          >
            <IKUpload
              onSuccess={onSuccess}
              style={{ display: "none" }}
              id="uploadProfileImage"
              useUniqueFileName={false}
              folder={userId}
            />
          </IKContext>
        </Box>

        <label htmlFor="uploadProfileImage">
          <Box
            sx={{
              position: "absolute",
              borderRadius: "50%",
              border: "7px solid transparent",
              top: "7rem",
              width: "5.5rem",
              height: "5.5rem",
              left: isMobileScreen ? "18rem" : "57rem",
              transition: "all 0.3s ease",
              "&:hover": {
                cursor: "pointer",
                border: "7px solid #cac9c9", // Or your desired hover border
              },
            }}
          >
            <UserAvatar inlineStyle={UserAvatarStyle} Text={FirstName} />
          </Box>
        </label>

        <NavBar onclick={validateName ? handleUpdate : null} />

        <Box
          sx={{
            position: "absolute",
            backgroundColor: "#e3e3e3",
            width: "25rem",
            height: "15rem",
            left: isMobileScreen ? "1rem" : "40rem",
            top: "35rem",
            borderRadius: "1rem",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "12rem",
              left: "2rem",
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
              width: "10rem",
              height: "3rem",
              borderRadius: "2rem",
              backgroundColor: "#cdcdcd",
              textAlign: "center",
              fontSize: "1.1rem",
              ":hover": {
                cursor: "pointer",
                color: "#252625",
              },
            }}
          >
            <span
              style={{
                position: "relative",
                top: ".6rem",
              }}
            >
              Delete account
            </span>
          </Typography>
        </Box>
      </Box>

      {isMobileScreen ? (
        //mobile
        <DeleteModal
          isText={true}
          textQuestion={"Are your sure you want to delete your Account?"}
          textInformation={
            "Deleting your account will permanently erase all your data, personal information, and any active subscriptions. "
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
        //desktop
        <DeleteModal
          isInput={false}
          isText={true}
          textQuestion={"Are your sure you want to delete your Account?"}
          textInformation={
            "Deleting your account will permanently erase all your data, personal information, and any active subscriptions.  "
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
