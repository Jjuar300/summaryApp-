import "./styles/images.css";
import { useDispatch, useSelector } from "react-redux";
import { setFileName, setImageClick } from "../../Redux/imageContainer";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import LazyLoad from "react-lazyload";
import { useEffect, useMemo, useState } from "react";
import AWS from "aws-sdk";

export default function Images() {
  const urlEnpoint = import.meta.env.VITE_IMAGEKIT_URL_KEY;
  const publickey = import.meta.env.VITE_PUBLIC_KEY;
  const isTranslate = useSelector((state) => state.imageContainer.isImageClick);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const config = {
      accessKeyId: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
      region: import.meta.env.VITE_AWS_REGION,
    };
    AWS.config.update(config);
    const s3 = new AWS.S3();
    const params = {
      Bucket: import.meta.env.VITE_AWS_S3_BUCKET,
      Key: "leaf.jpg",
    };
    s3.getSignedUrl("getObject", params, (err, url) => {
      if (err) {
        console.error(err);
      } else {
        setImageUrl(url);
      }
    });
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
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
        {/* <button className="upload" onClick={handleUpload} >UPLOAD</button> */}
        <input type="file" onChange={(e) => handleFileChange(e)} />
      </div>
    </div>
  );
}
