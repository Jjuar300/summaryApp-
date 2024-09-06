import { useState, lazy, Suspense } from "react";
import LinkIcon from "./assets/link.svg";
import { useSelector } from "react-redux";
import LazyLoad from "react-lazyload";

const Images = lazy(() => import("./Images"));

import "./styles/index.css";
import "./styles/linkicon.css";

export default function AddImage() {
  const [isHover, setHover] = useState(false);
  const [isLinkClick, setLinkClick] = useState(false);
  const image = useSelector((state) => state.imageContainer.fileName);
  const isTranslate = useSelector((state) => state.imageContainer.isImageClick);

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
          <LazyLoad>
            <img
              loading="lazy"
              onClick={handleLinkClick}
              className={isLinkClick ? "linkIcon2" : "linkIcon1"}
              src={LinkIcon}
              alt="icon"
            />
          </LazyLoad>
        </div>
      )}

      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        className="imageContainer"
      >
        <img
          className={isTranslate ? "translate" : "cozyImage"}
          style={{
            position: "absolute",
            width: "40rem",
            height: isLinkClick ? "50rem" : "58rem",
            top: isLinkClick ? "8rem" : "0rem",
            borderRadius: "1rem",
            objectFit: "cover",
            // opacity:'1',
            transition:
              "height 0.2s ease, top 0.2s ease, opacity 0.3s ease-in-out",
          }}
          loading="lazy"
          src={`${import.meta.env.VITE_AWS_URL}${image}`}
          alt=""
        />
      </div>

      {isLinkClick && (
        <Suspense>
          <Images />
        </Suspense>
      )}
    </>
  );
}
