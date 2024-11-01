import { useState, lazy, Suspense, useEffect, useMemo } from "react";
import LinkIcon from "./assets/link.svg";
import { useSelector } from "react-redux";
import LazyLoad from "react-lazyload";
import { useS3image } from "../../hooks";

const Images = lazy(() => import("./Images"));

import "./styles/index.css";
import "./styles/linkicon.css";

export default function AddImage() {
  const [isHover, setHover] = useState(false);
  const [isLinkClick, setLinkClick] = useState(false);
  // const image = useSelector((state) => state.imageContainer.fileName);
  const isFile = useSelector((state) => state.imageContainer.isFile); 
  const fileLink = useSelector((state) => state.imageContainer.fileLink); 
  const isTranslate = useSelector((state) => state.imageContainer.isImageClick);
  const {image} = useS3image(); 

  const handleHover = (event) => {
    setHover(event.type === "mouseenter");
  };

  console.log('fileLink at image:', fileLink)


  const handleLinkClick = () => {
    setLinkClick(!isLinkClick);
  };

  //getting s3 images
  const [s3Images, setS3Images] = useState([]); 
  useEffect(() => {
    
    const fetchS3Images = async () =>{
      const response = await fetch('api/file')
      const data = await response.json(); 
      return setS3Images(data); 
    }
    
    fetchS3Images(); 
    
  },[isFile])
  
  const s3Image = useMemo(() => {
    return image.map((image, index) => (
      <img
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
      src={ isFile ? image.signedurl : `${import.meta.env.VITE_AWS_URL}${image}`}
      />
     )); 
  },[s3Images])

  console.log('s3images data:',s3Images[0]?.signedurl)
  // s3Images.map((image) => (
  //   console.log('images:', image.filename)
  // ))

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

        {/* <img
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
          src={ isFile ? s3Images[0]?.signedurl : `${import.meta.env.VITE_AWS_URL}${image}`}
          /> */}
       {s3Image}
      </div>

      {isLinkClick && (
        <Suspense>
          <Images />
        </Suspense>
      )}
    </>
  );
}
