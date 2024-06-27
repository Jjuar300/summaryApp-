import { fetchData } from "../utils";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { sendObjectId } from "../Redux/createSpace";

export default function useGetData() {
    const [space, setSpaces] = useState([]); 
    const {user} = useUser(); 
    const spaceText = useSelector((state) => state.createSpace.spaceText)
    const objectId = useSelector((state) => state.createSpace.ObjectId);

    const getUserData = async () => {
        const response = await fetchData(`/api/users/${user?.id}`);
    
        if (response.spaces) {
          setSpaces(response.spaces);
        }
      };
    
      useEffect(() => {
        getUserData();
      }, [spaceText, objectId]);
    

    return {space, getUserData}
}
