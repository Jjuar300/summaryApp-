import { fetchData } from "../utils";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useSelector } from "react-redux";

export default function useGetData() {
  const [space, setSpaces] = useState([]);
  const { user } = useUser();
  const spaceText = useSelector((state) => state.createSpace.spaceText);
  const objectId = useSelector((state) => state.createSpace.ObjectId);
  const productionAPI = import.meta.env.VITE_PRODUCTION_API_URL;

  const getUserData = async () => {
    const response = await fetchData(`/${productionAPI}/users/${user?.id}`);

    if (response.spaces) {
      setSpaces(response.spaces);
    }
  };

  useEffect(() => {
    getUserData();
  }, [spaceText, objectId]);

  return { space, getUserData };
}
