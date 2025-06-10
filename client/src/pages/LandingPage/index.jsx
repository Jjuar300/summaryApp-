import { SignInButton } from "@clerk/clerk-react";
import './styles/index.css'
import computerGirl from './assets/GirlComputer.png';
import darkGrayPolygon from './assets/darkGrayPolygon.png';
import lightGrayPolygon from './assets/lightGrayPolygon.png';
import softGrayPolygon from './assets/softGrayPolygon.png';
import NoteTakingVideo from './assets/NoteTakingLanding1.mp4'

export default function index() {
  return (
    <>
      <h1 className="title">Collect your thoughts.</h1>
        <SignInButton>
          <button className="signIn" >Sign up</button>
        </SignInButton>
        <span className="takeNotes" >Take notes the simple way, Forever.</span>
        <img className="computerGirl" src={computerGirl} />
        <img className="darkgraypolygon" src={darkGrayPolygon} />
        <img className="lightgraypolygon" src={lightGrayPolygon} />
        <img className="softgraypolygon" src={softGrayPolygon} />
        <video autoPlay muted loop className="noteTakingVideo">
          <source src={NoteTakingVideo} />
        </video>
    </>
  );
}
