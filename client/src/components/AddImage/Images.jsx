import "./styles/images.css";
import { useDispatch, useSelector } from "react-redux";
import { setFileName, setImageClick } from "../../Redux/imageContainer";
import { IKContext, IKImage, IKUpload, } from "imagekitio-react";
import LazyLoad from "react-lazyload";
import { useMemo, useState } from "react";


export default function Images() {
  const urlEnpoint = import.meta.env.VITE_IMAGEKIT_URL_KEY;
  const publickey = import.meta.env.VITE_PUBLIC_KEY;
  const isTranslate = useSelector((state) => state.imageContainer.isImageClick);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null); 
  
  
  const authenticator = async () => {
    try {
      const response = await fetch('http://localhost:3004/auth'); 
    if(!response.ok){
      const errorText = await response.text(); 
      throw new Error(`Request failed with status ${response.status}: ${errorText}`); 
    }; 

    const data = await response.json(); 
    const {signature, expire, token} = data;
    return {signature, expire, token}; 

    } catch (error) {
      throw new Error(`Authentication request fail ${error.message}`)
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

 console.log('selectedFile:', selectedFile?.name)

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
        {/* <button className="upload" onClick={handleUpload} >UPLOAD</button> */}
        <input type="file" onChange={(e) => handleFileChange(e)} />
      
      <IKContext
      transformationPosition='path'
      authenticationEndpoint='http://localhost:3004/auth'
      publicKey='public_GjEtjvvBdROHsJ46QIVXwiNKWGo'
      urlEndpoint={urlEnpoint}
      authenticator={authenticator}
      >
      <IKUpload
      fileName={selectedFile?.name}/>
      </IKContext>
      </div>
    </div>
  );
}
