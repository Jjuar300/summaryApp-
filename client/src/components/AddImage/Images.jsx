import "./styles/images.css";
import { useDispatch, useSelector } from "react-redux";
import { setFileName, setImageClick } from "../../Redux/imageContainer";
import { IKImage, IKUpload } from "imagekitio-react";
import LazyLoad from "react-lazyload";
import { useMemo, useState } from "react";

export default function Images() {
  const urlEnpoint = import.meta.env.VITE_IMAGEKIT_URL_KEY;
  const publickey = import.meta.env.VITE_PUBLIC_KEY;
  const isTranslate = useSelector((state) => state.imageContainer.isImageClick);
  const dispatch = useDispatch();

  const images = [
    "leaf.jpg",
    "rocks.jpg",
    "tower.jpg",
    "window.jpg",
    "sunrise.jpg",
  ];

  const handleClick = (imageName) => {
    dispatch(setFileName(imageName));
    if (imageName) return dispatch(setImageClick(!isTranslate));
  };

  const mapImages = useMemo(() => {
    return images.map((image, index) => (
      <LazyLoad key={index}>
        <IKImage
          onClick={() => handleClick(image)}
          className="darkimage"
          loading="lazy"
          role="presentation"
          decoding="async"
          key={index}
          urlEndpoint={urlEnpoint}
          publicKey={publickey}
          path={`${image}`}
        />
      </LazyLoad>
    ));
  }, [images]);

  return (
    <div>
      <div className="imagetitle">Images</div>
      <div className={"images"}>
        {mapImages}
        <button className="upload">UPLOAD</button>
      </div>
    </div>
  );
}
