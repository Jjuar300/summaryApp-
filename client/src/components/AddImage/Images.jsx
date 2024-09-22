import "./styles/images.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setFileName,
  setImageClick,
  setFile,
  setFileLink, 
} from "../../Redux/imageContainer";
import LazyLoad from "react-lazyload";
import { useMemo, useState } from "react";

export default function Images() {
  const isTranslate = useSelector((state) => state.imageContainer.isImageClick);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    dispatch(setFile(true));

    const form = new FormData();
    form.append("file", file);

    const response = await fetch("/api/file", {
      method: "POST",
      body: form,
    });

    const data = await response.json();
    dispatch(setFileLink(data?.fileLink)); 
  };

  const images = [
    "leaf.jpg",
    "rocks.jpg",
    "tower.jpg",
    "window.jpg",
    "sunrise.jpg",
  ];

  const handleClick = (imageName) => {
    dispatch(setFileName(imageName));
    if (imageName) return dispatch(setFile(false));
    if (imageName) return dispatch(setImageClick(!isTranslate));
  };

  const mapImages = useMemo(() => {
    return images.map((image, index) => (
      <LazyLoad key={index}>
        <img
          onClick={() => handleClick(image)}
          loading="lazy"
          className="darkimage"
          src={`${import.meta.env.VITE_AWS_URL}${image}`}
          alt=""
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
        <input type="file" name="file" onChange={(e) => handleFileChange(e)} />
      </div>
    </div>
  );
}
