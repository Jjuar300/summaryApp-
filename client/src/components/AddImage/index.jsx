import { useState, lazy, Suspense, useEffect, useMemo } from "react";
import LinkIcon from "./assets/link.svg";
import { useSelector } from "react-redux";
import LazyLoad from "react-lazyload";
import { useS3image } from "../../hooks";
import { IKImage } from "imagekitio-react";

const Images = lazy(() => import("./Images"));

import "./styles/index.css";
import "./styles/linkicon.css";

export default function AddImage() {
  const [isHover, setHover] = useState(false);
  const [isLinkClick, setLinkClick] = useState(false);
  const selectImage = useSelector((state) => state.imageContainer.fileName);
  const isFile = useSelector((state) => state.imageContainer.isFile); 
  const fileName = useSelector((state) => state.imageContainer.fileLink); 
  const isTranslate = useSelector((state) => state.imageContainer.isImageClick);
  const {images, signedUrl} = useS3image(); 
  const userImage = useSelector(state => state.imagekit.path); 

  console.log('userImage:', userImage); 

  const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_KEY

  const handleHover = (event) => {
    setHover(event.type === "mouseenter");
  };

  const handleLinkClick = () => {
    setLinkClick(!isLinkClick);
  }

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

       {/* {
        images?.map((image, index) => {
          if(image?.filename === fileName) {
            return <img
            key={index}
            className={isTranslate ? "translate" : 'cozyImage' }
            style={{
              position: "absolute",
              width: "40rem",
              height: isLinkClick ? "50rem" : "58rem",
              top: isLinkClick ? "8rem" : "0rem",
              borderRadius: "1rem",
              objectFit: "cover",
              transition: "height 0.2s ease, top 0.2s ease, opacity 0.3s ease-in-out",
            }}
            loading="lazy"
            src={ isFile ? signedUrl : `${import.meta.env.VITE_AWS_URL}${selectImage}`}
            />
          }
        })
       } */}
       <IKImage
      className={isTranslate ? "translate" : 'cozyImage' }
      style={{
        position: "absolute",
        width: "40rem",
        height: isLinkClick ? "50rem" : "58rem",
        top: isLinkClick ? "8rem" : "0rem",
        borderRadius: "1rem",
        objectFit: "cover",
        transition: "height 0.2s ease, top 0.2s ease, opacity 0.3s ease-in-out",
      }}
        urlEndpoint={urlEndpoint}
        path={`${userImage}`}
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
