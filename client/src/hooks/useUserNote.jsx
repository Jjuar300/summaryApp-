import { fetchData } from "../utils";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function useUserNote() {
  const { user } = useUser();
  const spaceId = useSelector((state) => state.createSpace.ObjectId);
  const [savedData, setSavedData] = useState([]);
  const [initialContent, setInitialContent] = useState(undefined);

  const fetchUserNote = async () => {
    // const savedContent = await fetchData(`/api/userNotes/${user?.id}`);
    const savedContent = await fetchData(
      `/api/users/${user?.id}/spaces/${spaceId}`
    );
    setSavedData(savedContent);
    if (savedContent) {
      const blocks = JSON.parse(savedContent?.notes?.[0]?.content);
      return setInitialContent(blocks);
    }
  };

  return { fetchUserNote, savedData, initialContent };
}
