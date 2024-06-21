import { fetchData } from "../utils";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

export default function useGetData() {
    const [space, setSpaces] = useState([]); 
    const {user} = useUser(); 

    const getUserData = async () => {
        const response = await fetchData(`/api/users/${user?.id}`);
    
        if (response.spaces) {
          setSpaces(response.spaces);
        }
      };
    
      useEffect(() => {
        getUserData();
      }, []);
    

    return {space}
}
