import { lazy } from "react";
import dogSleep from "./assets/dogSleep.jpg";
import "./styles/images.css";
import { useDispatch } from "react-redux";
import { setFileName } from "../../Redux/imageContainer";
import  darkImage  from './assets/darkImage.jpg';  
import azy from "./assets/azy.jpg";
import triku from "./assets/triku.jpg";
import outWinter from "./assets/outwinter.jpg";
import {lazyload} from 'react-lazyload'

export default function Images() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setFileName(outWinter));
  };

  return (
    <div className="images">
      <img
        onClick={handleClick}
        className="sleepydog"
        src={dogSleep}
        alt="image"
      />

      <img
        onClick={handleClick}
        className="darkimage"
        src={darkImage}
        alt="image"
      />

      <img 
      onClick={handleClick} 
      className="azy" 
      src={azy} 
      alt="image" 
      />

      <img 
      onClick={handleClick} 
      className="triku" src={triku} 
      alt="image"
      />

      <img
        onClick={handleClick}
        className="outwinter"
        src={outWinter}
        alt="image"
      />

      <button>Upload</button>
    </div>
  );
}
