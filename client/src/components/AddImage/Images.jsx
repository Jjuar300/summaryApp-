import { lazy, useState } from "react";
import dogSleep from "./assets/dogSleep.jpg";
import "./styles/images.css";
import { useDispatch, useSelector } from "react-redux";
import { setFileName, setImageClick } from "../../Redux/imageContainer";
import darkImage from "./assets/darkImage.jpg";
import azy from "./assets/azy.jpg";
import triku from "./assets/triku.jpg";
import outWinter from "./assets/outwinter.jpg";
import LazyLoad from "react-lazyload";


export default function Images() {
  const isTranslate = useSelector((state) => state.imageContainer.isImageClick); 
  const dispatch = useDispatch();

  const images = [darkImage, azy, triku, outWinter, dogSleep];

  const handleClick = (imageName) => {
    dispatch(setFileName(imageName));
    if(imageName) return     dispatch(setImageClick(!isTranslate))
  };

  return (
    <div   className='images'>
      {images.map((image, index) => (
        <LazyLoad>
          <img
            loading="lazy"
            key={index}
            onClick={() => handleClick(image)}
            className="darkimage"
            src={image}
            alt="image"
          />
        </LazyLoad>
      ))}

      <button className="upload">UPLOAD</button>
    </div>
  );
}
