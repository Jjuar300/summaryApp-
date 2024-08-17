import { lazy } from "react";
import cozyImage from "../darkImage.jpg";
import { useState } from "react";
import LinkIcon from "./assets/link.svg";
import Images from "./Images";
import { useSelector } from "react-redux";

import "./styles/index.css";
import "./styles/linkicon.css";

export default function AddImage() {
  const [isHover, setHover] = useState(false);
  const [isLinkClick, setLinkClick] = useState(false);
  const image = useSelector(state => state.imageContainer.fileName)

  const handleHover = (event) => {
    setHover(event.type === "mouseenter");
  };

  const handleLinkClick = () => {
    setLinkClick(!isLinkClick);
  };

  return (
    <>
      {isHover && (
        <div onMouseEnter={handleHover} onMouseLeave={handleHover}>
          <img
            onClick={handleLinkClick}
            className={isLinkClick ? "linkIcon2" : "linkIcon1"}
            src={LinkIcon}
            alt="icon"
          />
        </div>
      )}

      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
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
            // opacity:'1', 
            transition: "height 0.2s ease, top 0.2s ease, opacity 0.3s ease-in-out",
          }}
          src={image}
          alt="add image here"
        />

        <Images />
      </div>
    </>
  );
}
