import cozyImage from "../darkImage.jpg";
import { useState } from "react";
import LinkIcon from "./assets/link.svg";
import "./styles/index.css";
import "./styles/linkicon.css";

export default function AddImage() {
  const [isHover, setHover] = useState(false);
  const [isLinkClick, setLinkClick] = useState(false);

  const handleHover = (event) => {
    setHover(event.type === "mouseenter");
  };

  const handleLinkClick = () => {
    setLinkClick(!isLinkClick);
  };

  return (

  <>
    <div>
      <img
          onClick={handleLinkClick}
          className={isLinkClick ? "linkIcon2" : "linkIcon1"}
          src={LinkIcon}
          alt="icon"
        />
    </div>

    <div
        // onMouseEnter={handleHover}
        // onMouseLeave={handleHover}
        className="imageContainer"
      >

        <img
          className="cozyImage"
          style={{
            position: "absolute",
            width: "40rem",
            height: isLinkClick ? "50rem" : "58rem",
            top: isLinkClick ? "8rem" : "0rem",
            borderRadius: "1rem",
            objectFit: "cover",
            transition: "height 0.2s ease, top 0.2s ease",
          }}
          src={cozyImage}
          alt="add image here"
        />

        {/* {isHover && ( 
     <div
     className='linkIcon'
     >
         <img 
        className='linkIcon'
        src={LinkIcon} alt="icon" />
     </div>
  )} */}

    

      </div>
  </>
  );
}
