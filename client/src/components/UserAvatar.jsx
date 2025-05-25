import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { IKImage } from "imagekitio-react";

export default function UserAvatar({
  Text,
  submitOnClickFunction,
  inlineStyle,
}) {
  const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_KEY;

  const profileImage = useSelector(
    (state) => state.imageContainer.profileImagePath
  );

  return (
    <>
      <Avatar sx={inlineStyle} onClick={submitOnClickFunction}>
        {`${Text}`}
        <IKImage
          style={{
            position:'absolute', 
            width: "5.5rem",
            height: "5.5rem",
            objectFit: "cover",
            borderRadius: "50%",
          }}
          path={profileImage}
          urlEndpoint={urlEndpoint}
        />
      </Avatar>
    </>
  );
}