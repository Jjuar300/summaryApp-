import "./styles/images.css";
import { useDispatch } from "react-redux";
import {
  setFileName,
  setImageClick,
  setFile,
} from "../../Redux/imageContainer";
import { useMemo } from "react";
import { useUser } from "@clerk/clerk-react";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import { setSuccessData } from "../../Redux/imagekit";

export default function Images() {
  const dispatch = useDispatch();
  const { user } = useUser();

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
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authenticator request failed: ${error.message} `);
    }
  };

  // const onError = (err) => {
  //   console.log("success:", err);
  // };

  const onSuccess = (res) => {
    // console.log("Success", res);
    dispatch(setSuccessData(res.filePath));
    dispatch(setFile(true));
    dispatch(setImageClick(true));
  };

  // const UploadProgress = (progress) => {
  //   console.log("Progress", progress);
  // };

  // const onUploadStart = (evt) => {
  //   console.log("start", evt);
  // };

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
  }, []);

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
        />

        <IKContext
          urlEndpoint={urlEndpoint}
          publicKey={publicKey}
          authenticator={authenticator}
        >
          <IKUpload
            style={{
              display: "none",
              cursor: "pointer",
            }}
            id="imagekitFile"
            useUniqueFileName={true}
            // onError={onError}
            onSuccess={onSuccess}
            // onProgress={UploadProgress}
            // onUploadStart={onUploadStart}
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
