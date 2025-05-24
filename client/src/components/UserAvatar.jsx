import Avatar from "@mui/material/Avatar";
import image from  './image_2.jpg'

export default function UserAvatar({
  Text,
  submitOnClickFunction,
  inlineStyle,
}) {

  return (
    <>
      <Avatar src={image} sx={inlineStyle} onClick={submitOnClickFunction}>
        {`${Text}`}
      </Avatar>
    </>
  );
}

/*
      const profileImage = useSelector(state => state.image.imageProfile)
      const isImage = useSelector(state.image.isImage)

      <Avatar src={ isImage ? profileImage : null} sx={inlineStyle} onClick={submitOnClickFunction}>
        {`${Text}`}
      </Avatar>
*/