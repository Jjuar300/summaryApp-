import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";

import useGetChatgpt from "./useGetChatgpt";

export default function useTiptap() {
  const {chatgptData} = useGetChatgpt(); 

     const response = chatgptData?.map(({response}) => {
      return response; 
    })

  const contentResponse = response; 

console.log('response:', contentResponse)


    const editor = useEditor({
        extensions: [
          StarterKit,
          Placeholder.configure({
            placeholder: "type something here...",
          }),
          TextAlign.configure({
            types: ["heading", "paragraph"],
          }),
    
          Heading.configure({
            levels: [1, 2, 3],
          }),
    
          Underline,
          TaskList,
          TaskItem,
        ],
      // content: contentResponse, 
      });

    return {editor, contentResponse}
}
