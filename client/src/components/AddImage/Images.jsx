import { lazy, useState } from "react";
import dogSleep from "./assets/dogSleep.jpg";
import "./styles/images.css";
import { useDispatch, useSelector } from "react-redux";
import { setFileName, setImageClick } from "../../Redux/imageContainer";
import flower from "./assets/flower.jpg";
import azy from "./assets/azy.jpg";
import triku from "./assets/triku.jpg";
import outWinter from "./assets/outwinter.jpg";

import LazyLoad from "react-lazyload";

// const darkImage = lazy(() => import('./assets/darkImage.jpg'));
// const azy = lazy(() => import('./assets/azy.jpg'));
// const triku = lazy(() => import('./assets/triku.jpg'));
// const outWinter = lazy(() => import('./assets/outWinter.jpg'));
// const dogSleep = lazy(() => import('./assets/dogSleep.jpg'));

export default function Images() {
  const isTranslate = useSelector((state) => state.imageContainer.isImageClick); 
  const dispatch = useDispatch();

  const images = [flower, azy, triku, outWinter, dogSleep];

  const handleClick = (imageName) => {
    dispatch(setFileName(imageName));
    if(imageName) return     dispatch(setImageClick(!isTranslate))
  };

  return (
    <div   className='images'>
      {images.map((image, index) => (
        <LazyLoad >
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
