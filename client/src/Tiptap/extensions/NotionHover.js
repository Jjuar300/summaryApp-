import { Node } from "@tiptap/react";
import './css/NotionHover.css'

export const NotionHover = Node.create({
  name: "notionHover",
  group: "block",
  content: "inline",
  
  parseHTML(){
    return [{tag: 'div.hover-node'}]; 
  }, 

  addNodeView(){
    return({node, editor, getPos, HTMLAttributes}) => {
      const container = document.createElement('div'); 
      container.classList.add("hover-node"); 

    
    }
  }

});
