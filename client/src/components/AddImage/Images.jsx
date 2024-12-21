import "./styles/images.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setFileName,
  setImageClick,
  setFile,
  setFileLink,
} from "../../Redux/imageContainer";
import LazyLoad from "react-lazyload";
import { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useS3image } from "../../hooks";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import { generateUploadButton } from "@uploadthing/react";
import { setSuccessData } from "../../Redux/imagekit";

export default function Images() {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = useUser();
  const { getS3image } = useS3image();
  const userUploadImage = useSelector(state => state.imagekit.path); 

  const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
  const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URLENDPOINT;
  const userId = user?.id; 
  const imagekitUrl = import.meta.env.VITE_IMAGEKIT_URLENDPOINT; 

  const authenticator = async () => {
    try {
      const response = await fetch("/api/authImage");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("image data:", data);
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authenticator request failed: ${error.message} `);
    }
  };

  const onError = (err) => {
    console.log("success:", err);
  };

  const onSuccess = (res) => {
    console.log("Success", res);
    dispatch(setSuccessData(res.filePath))
    dispatch(setFile(true))
    dispatch(setImageClick(true));
  };

  const UploadProgress = (progress) => {
    console.log("Progress", progress);
  };

  const onUploadStart = (evt) => {
    console.log("start", evt);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    dispatch(setFile(true));

    const form = new FormData();
    form.append("file", file);
    form.append("userId", user?.id);

    const response = await fetch("/api/authImage", {
      method: "POST",
      body: form,
    });

    const data = await response.json();
    console.log("data:", data);
    if (response.ok) {
      dispatch(setFileLink(file?.name));
      // getS3image();
    }
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
    dispatch(setFile(false));
    dispatch(setImageClick());
    // if (imageName) return dispatch(setFile(false));
  };

  const mapImages = useMemo(() => {
    return images.map((image, index) => (
        <IKImage
        key={index}
        className="darkimage"
        urlEndpoint={imagekitUrl}
        path={`note_taking_app/${image}`}
        onClick={() => handleClick(image)}
      />
    ));
  },[]);

  return (
    <div>
      <div className={"images"}>
        {mapImages}
        <input
          style={{
            display: "none",
            cursor: "pointer",
          }}
          type="file"
          id="file"
          // onChange={(e) => handleFileChange(e)}
        />


        <IKContext
          urlEndpoint={urlEndpoint}
          publicKey={publicKey}
          authenticator={authenticator}
        >
          <IKUpload
          style={{
            display: 'none', 
            cursor: 'pointer', 
          }}
          id="imagekitFile"
            useUniqueFileName={true}
            // onChange={(e) => handleFileChange(e)}
            fileName={`${selectedFile?.name}`}
            onError={onError}
            onSuccess={onSuccess}
            onProgress={UploadProgress}
            onUploadStart={onUploadStart}
            folder={userId}
          />
        </IKContext>

        <label className="upload-label" htmlFor="imagekitFile">
          upload
        </label>
      </div>
    </div>
  );
}
