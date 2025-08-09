import "./styles/Index.css";
import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { UserAvatar, PopoverContainer } from "../../components";
import { useUser, SignOutButton, useClerk } from "@clerk/clerk-react";
import { Popover, Box, Button } from "@mui/material";
import { useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  settings,
  logout,
  checkMark,
  NoteLogo,
  fireIcon,
} from "./assets/index";
import { sendObjectId } from "../../Redux/createSpace";
import { useUserPayment } from "../../hooks";
import { setSessionStatus } from "../../Redux/Stripe";

export default function Index() {
  const priceId = import.meta.env.VITE_TEST_PRICE_KEY;
  const isMobileScreen = useMediaQuery("(max-width:430px)");
  const [isPlanButton, setPlanButton] = useState(false);
  const pricePlan = isPlanButton ? 20 : 120;
  const subscriptionPan = isPlanButton ? '/mo' : '/yr'; 
  const { user } = useUser();
  const FirstName = user.firstName.charAt(0).toUpperCase();
  const [anchorEl, setAnchorEl] = useState(null);
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");
  
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log('priceid:', priceId)
  
  const toggleSubscriptionPlan = () => {
    setPlanButton(!isPlanButton);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnClick = () => {
    dispatch(sendObjectId(null));
  };

  const handleSubscriptionPlan = async (priceId) => {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          email: user.primaryEmailAddress.emailAddress,
        }),
      });

      const { session } = await response.json();
      console.log('session:',session)
      if (session) return (window.location.href = session.url);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const savePayment = async () => {
    try {
      // dispatch(setSessionStatus('pending'))
      const response = await fetch("/api/save-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id: sessionId, userId: user.id }),
      });
      const data = await response.json();
      console.log("userPaymentData:", data);
       dispatch(setSessionStatus(data.subscription.status));
        if(data.subscription.status === 'active') return navigate('/BrowseSpace')
      } catch (error) {
      return error;
    }
  };


  useEffect(() => {
    savePayment();
    // getSubscriptionPlan(); 
  },[]);

  const boxStyle = {
    position: "relative",
    display: "flex",
    left: "1rem",
  };

  const buttonStyle = {
    fontSize: "1rem",
    color: "black",
    width: "10rem",
    left: "-2rem",
  };

  return (
    <div>
      <UserAvatar
        inlineStyle={{
          position: "absolute",
          left: "90rem",
          top: "2rem",
          ":hover": {
            cursor: "pointer",
          },
        }}
        Text={FirstName}
        submitOnClickFunction={handleClick}
      />
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
        <PopoverContainer
          imageIcon={settings}
          text={"Settings"}
          submitOnClick={() => navigate("/settings")}
          boxStyle={boxStyle}
          buttonStyle={buttonStyle}
          isIcon={true}
        />

        <SignOutButton signOutOptions={{redirectUrl: '/Noto'}}>
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
      </Popover>

      <h1 className={isMobileScreen ? "pickPlan-mobile" : "pickPlan"}>
        Pick your plan
      </h1>

      <div className={isMobileScreen ? "logo-mobile" : "logo"}>
        <img className="NoteLogo" src={NoteLogo} />
        <span className="LogoTitle">Noto</span>
      </div>

      <div className={isMobileScreen ? "mo-ye-mobile" : "mo-ye"}>
        <span className={isPlanButton ? "tl-monthly" : "tl-monthly-click"}>
          Monthly
        </span>
        <span className={isPlanButton ? "tl-annually-click" : "tl-annually"}>
          Annually
        </span>
        <span className={isPlanButton ? "tl-discount-click" : "tl-discount"}>
          50% off
        </span>
        <button
          onClick={toggleSubscriptionPlan}
          className={isPlanButton ? "btn-mo-ye-click" : "btn-mo-ye"}
        >
          <span
            className={
              isPlanButton ? "animationCircle-click" : "animationCircle"
            }
          />
        </button>
      </div>

      <div className={isMobileScreen ? "subPlan-mobile" : "subPlan"}>
        <span className="pricePlan">
          <div className="threeFreeModal">
            <img className="fireIcon" src={fireIcon} alt="fireIcon" />
            <span className="threeFree">3 days free</span>
          </div>

          <span className="proPlan">Pro plan</span>
          <span className="pricePlan">
            ${pricePlan}
            <span className="month">{subscriptionPan}</span>
          </span>
        </span>
        <button
          onClick={() => handleSubscriptionPlan(priceId)}
          className="btn-startTrial"
        >
          Start free trial
        </button>
        <span className="divider">
          ________________________________________
        </span>

        <div className="details">
          <li>
            <img className="checkMark" src={checkMark} alt="check" /> All
            features
          </li>
          <li>
            <img className="checkMark" src={checkMark} alt="check" /> Unlimied
            spaces
          </li>
          <li>
            <img className="checkMark" src={checkMark} alt="check" /> Unlimited
            tasks and notes
          </li>
          <li>
            <img className="checkMark" src={checkMark} alt="check" /> 25MB
            uploads & 500MB storage
          </li>
        </div>
      </div>
    </div>
  );
}
