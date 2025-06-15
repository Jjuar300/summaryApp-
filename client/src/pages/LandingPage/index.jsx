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
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_live_51NF8hxKBWAiPiCSPtcoQCx48lHOJtJO2DPNIlVCm3oWWHLqM6UAhKHIJINBAYP8IoRBZiqIe5Q7tKEzP0MWiOkAY003QNuFgTR"
);

export default function index() {
  const fetchClientSecret = async () => {
    return fetch("/create-checkout-session", { method: "POST" })
      .then((response) => response.json())
      .then((json) => json.checkoutSessionClientSecret);
  };

  return (
    <>
      {/* <h1 className="title">Collect your thoughts.</h1>
      <SignInButton>
        <button className="signIn">Start free trial</button>
      </SignInButton> */}

      <Elements stripe={stripePromise} >
        <button className="signIn">Start free trial</button>

      </Elements>
    
      <span className="takeNotes">Take notes the simple way, Forever.</span>
      <img className="computerGirl" src={computerGirl} />
      <img className="darkgraypolygon" src={darkGrayPolygon} />
      <img className="lightgraypolygon" src={lightGrayPolygon} />
      <img className="softgraypolygon" src={softGrayPolygon} />

      <div className="copyRights">
        <img className="Ccorporation" src={Ccorporation} />
        <span>2025 Noto</span>
      </div>

      <div className="logo">
        <img className="NoteLogo" src={NoteLogo} />
        <span className="LogoTitle">Noto</span>
      </div>
      <video autoPlay muted loop className="noteTakingVideo">
        <source src={NoteTakingVideo} />
      </video>
    </>
  );
}
