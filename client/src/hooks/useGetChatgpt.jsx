import { fetchData } from "../utils";
import { useUser } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";


export default function useGetChatgpt() {
    const {user} = useUser(); 
    const [chatgptData, setChatgptData] = useState([]);
    const objectId = useSelector((state) => state.createSpace.ObjectId);

    const getChatGpt = async () => {
        const response = await fetchData(`/api/users/${user.id}/spaces/${objectId}`); 
        if(response?.chatGpt){
         return setChatgptData(response?.chatGpt);
        }
      };
        
      useEffect(() => {
        getChatGpt();
      }, [objectId]);
    
    return {chatgptData, getChatGpt}
}
