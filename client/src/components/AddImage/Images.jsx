import "./styles/images.css";
import { useDispatch, useSelector } from "react-redux";
import { setFileName, setImageClick } from "../../Redux/imageContainer";
import LazyLoad from "react-lazyload";
import { useMemo, useState } from "react";
import AWS from 'aws-sdk'; 

export default function Images() {
  const isTranslate = useSelector((state) => state.imageContainer.isImageClick);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);


  const uploadFile = async (file) =>{ 
    try {
    const s3 = new AWS.S3({
      accessKeyId: `${import.meta.env.VITE_AWS_ACCESS_KEY}`,
      secretAccessKey: `${import.meta.env.VITE_AWS_SECRET_ACCESS_KEY}`, 
      region: `${import.meta.env.VITE_AWS_REGION}`
    })

    const params = {
      Bucket:`${import.meta.env.VITE_AWS_S3_BUCKET}`, 
      Key: file?.name, 
      Body:file, 
    }

    const data = await s3.upload(params).promise(); 
    console.log('Error uploading file:', data); 

    } catch (error) {
      console.error('error uploading error:', error)
    }
  }

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
        <button className="upload" onClick={() => uploadFile(selectedFile)} >UPLOAD</button>
        <input type="file" onChange={(e) => handleFileChange(e)} />
      </div>
    </div>
  );
}
