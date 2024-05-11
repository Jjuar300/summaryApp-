import React, { useEffect } from "react";
import { useUser, SignIn } from "@clerk/clerk-react";
import { postData } from "../utils";

export default function userSignIn() {
  const { user } = useUser();
  const userFullname = user.fullName;

  postData("http://localhost:3004/postnewuser", {
    fullname: user.fullName,
    userName: user.username,
    email: user.primaryEmailAddress.emailAddress,
    userId: user.id,
    password: user.passwordEnabled,
    spaceId: null,
  });

  console.log("userName:", userFullname);
  console.log("user id:", user.id);
  console.log("user email:", user.primaryEmailAddress.emailAddress);
  console.log("user password:", user.passwordEnabled);

  return <></>;
}
