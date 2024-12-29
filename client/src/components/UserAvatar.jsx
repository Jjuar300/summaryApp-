import Avatar from "@mui/material/Avatar";

export default function UserAvatar({
  Text,
  submitOnClickFunction,
  inlineStyle,
}) {
  return (
    <>
      <Avatar sx={inlineStyle} onClick={submitOnClickFunction}>
        {`${Text}`}
      </Avatar>
    </>
  );
}
