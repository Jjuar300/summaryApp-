import { SignInButton } from "@clerk/clerk-react";
import "./styles/index.css";
import computerGirl from "./assets/GirlComputer.png";
import darkGrayPolygon from "./assets/darkGrayPolygon.png";
import lightGrayPolygon from "./assets/lightGrayPolygon.png";
import softGrayPolygon from "./assets/softGrayPolygon.png";
import NoteTakingVideo from "./assets/NoteTakingLanding1.mp4";
import Ccorporation from "./assets/Ccorporation.png";
import NoteLogo from "./assets/NoteLogo.png";
import { Elements } from "@stripe/react-stripe-js";
import SubscriptionFrom from "../Stripe/SubscriptionFrom";
import { loadStripe } from "@stripe/stripe-js";
import { useMediaQuery } from "@mui/material";
// import { useUser } from "@clerk/clerk-react";

const stripePromise = loadStripe(
  "pk_live_51NF8hxKBWAiPiCSPtcoQCx48lHOJtJO2DPNIlVCm3oWWHLqM6UAhKHIJINBAYP8IoRBZiqIe5Q7tKEzP0MWiOkAY003QNuFgTR"
);

export default function index() {
  const isMobileScreen = useMediaQuery("(max-width:430px)");

  return (
    <>
      <h1 className={isMobileScreen ? "title-mobile" : "title"}>
        Collect your thoughts.
      </h1>
      <SignInButton>
        <button className={isMobileScreen ? "signIn-mobile" : "signIn"}>
          Start free trial
        </button>
      </SignInButton>
      {/* <Elements stripe={stripePromise} >
         <SubscriptionFrom/>
      </Elements>  */}
      <span className={isMobileScreen ? "takeNotes-mobile" : "takeNotes"}>
        Take notes the simple way, Forever.
      </span>
      <img
        className={isMobileScreen ? "computerGirl-mobile" : "computerGirl"}
        src={computerGirl}
      />
      {isMobileScreen ? null : (
        <img className="darkgraypolygon" src={darkGrayPolygon} />
      )}
      {isMobileScreen ? null : (
        <img className="lightgraypolygon" src={lightGrayPolygon} />
      )}
      {isMobileScreen ? null : (
        <img className="softgraypolygon" src={softGrayPolygon} />
      )}
      <div className={isMobileScreen ? "copyRights-mobile" : "copyRights"}>
        <img className="Ccorporation" src={Ccorporation} />
        <span>2025 Noto</span>
      </div>
      <div className={isMobileScreen ? "logo-mobile" : "logo"}>
        <img className="NoteLogo" src={NoteLogo} />
        <span className="LogoTitle">Noto</span>
      </div>
      <video
        autoPlay
        muted
        loop
        className={
          isMobileScreen ? "noteTakingVideo-mobile" : "noteTakingVideo"
        }
      >
        <source src={NoteTakingVideo} />
      </video>
    </>
  );
}
