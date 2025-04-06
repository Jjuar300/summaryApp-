import { fetchData, updateData, postData } from "../utils";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetData } from "../hooks";

export default function useUserNote() {
  const { user } = useUser();
  const spaceId = useSelector((state) => state.createSpace.ObjectId);

  const [savedData, setSavedData] = useState([]);
  const [initialContent, setInitialContent] = useState(undefined);

  const userData = useGetData();
  const isSpaceId = userData.space.find((space) => space._id === spaceId);

  const handleEditorChange = async (jsonBlock) => {
    await updateData("/api/updateUserNotes", {
      content: JSON.stringify(jsonBlock),
      userId: user?.id,
      noteDoId: isSpaceId?.notes[0]?._id,
    });
  };

  const fetchUserNote = async () => {
    const savedContent = await fetchData(
      `/api/users/${user?.id}/spaces/${spaceId}`
    );
    setSavedData(savedContent);
    if (savedContent) {
      const blocks = JSON.parse(savedContent?.notes?.[0]?.content);
      return setInitialContent(blocks);
    }
  };

  return {
    fetchUserNote,
    savedData,
    initialContent,
    handleEditorChange,
  };
}
