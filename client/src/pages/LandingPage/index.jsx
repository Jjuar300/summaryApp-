import { SignInButton } from "@clerk/clerk-react";
import "./styles/index.css";
import computerGirl from "./assets/GirlComputer.png";
import darkGrayPolygon from "./assets/darkGrayPolygon.png";
import lightGrayPolygon from "./assets/lightGrayPolygon.png";
import softGrayPolygon from "./assets/softGrayPolygon.png";
import NoteTakingVideo from "./assets/NoteTakingLanding1.mp4";
import Ccorporation from "./assets/Ccorporation.png";
import NoteLogo from "./assets/NoteLogo.png";

export default function index() {
  return (
    <>
      <h1 className="title">Collect your thoughts.</h1>
      <SignInButton>
        <button className="signIn">Sign up</button>
      </SignInButton>
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
