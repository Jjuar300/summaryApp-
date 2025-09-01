import { Box, useMediaQuery, Drawer, Button } from "@mui/material";
import Actions from "./Actions/index";
import AccountProfile from "./AccountProfile/index";
import ExitArrow from "./assets/ExitArrow.svg";
import Summary from "../Summary";
import { AddImage, Feed } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../Redux/homePage";
import FeedBack from "../FeedBack/index";
import "./styles/index.css";

export default function Index() {
  const isMobileScreen = useMediaQuery("(max-width:430px)");
  const dispatch = useDispatch();
  const open = useSelector((state) => state.homePage.open);
  const isNotifyOpen = useSelector((state) => state.feedBack.isNotify);

  const mobileUserAvatarStyle = {
    position: "absolute",
    backgroundColor: "orange",
    bottom: "1.5rem",
    right: "2rem",
    width: "3rem",
    height: "3rem",
    fontSize: "1.4rem",
  };

  function showNotification() {
    if (isNotifyOpen) return <Feed />;
  }

  return (
    <>
      {isMobileScreen ? (
        <>
          <Drawer
            open={open}
            anchor="left"
            PaperProps={{
              sx: {
                height: "58rem",
              },
            }}
          >
            <Box
              sx={{
                width: "20rem",
              }}
            >
              <AccountProfile avatarStyle={mobileUserAvatarStyle} />
              <Actions setOpen={setOpen} />
              <Button
                onClick={() => dispatch(setOpen(false))}
                sx={{
                  position: "absolute",
                  left: "15rem",
                  top: "1rem",
                  opacity: ".4",
                }}
              >
                <img src={`${ExitArrow}`} />
              </Button>
            </Box>
          </Drawer>

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
            <img src={`${ExitArrow}`} />
          </Button>
        </>
      ) : (
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "#f4f4f4",
            width: "16rem",
            height: "59rem",
            left: ".2rem",
            top: ".05rem",
            borderTopRightRadius: "1rem",
            borderBottomRightRadius: "1rem",
          }}
        >
          <AddImage />
          <AccountProfile />
          <Actions />
        </Box>
      )}

      <Box
        sx={{
          position: "absolute",
          backgroundColor: "#f4f4f4",
          height: isMobileScreen ? "58.2rem" : "58rem",
          borderRadius: isMobileScreen ? "0rem" : "1rem",
          width: isMobileScreen ? "28.7rem" : "58rem",
          left: isMobileScreen ? "-2rem" : "17rem",
          top: "-.1rem",
        }}
      >
        <Summary />
      </Box>

      <FeedBack />
      {showNotification()}
    </>
  );
}
