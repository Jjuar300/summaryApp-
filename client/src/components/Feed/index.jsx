import { Box } from "@mui/material";
import ThumbsUpIcon from "./assets/thumbsUp.svg";
import './styles/index.css'

export default function Feed() {
  return (
    <div
    className="notifySend"
    >
     
        <img className="thumbsUp" src={ThumbsUpIcon} />

        <h1
          style={{
            position: "relative",
            color: "white",
            fontSize: "1.2rem",
            left: "7rem",
            width: "60vw",
            top: ".5rem",
            // border:'1px solid red'
          }}
        >
          {" "}
          Thank you for your feedback
        </h1>
    </div>
  );
}
