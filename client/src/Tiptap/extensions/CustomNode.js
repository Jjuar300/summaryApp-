import { Node, ReactNodeViewRenderer } from "@tiptap/react"
import Image from "./Image";

export const CustomNode = Node.create({
    name: 'customNode', 
    group: 'block', 
    content: 'inline*', 


    addAttributes(){
        return {
            src: {default: 'https://plus.unsplash.com/premium_photo-1701104011406-b8352e13833e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}, 
            selected: {default: false}
        }
    },

    parseHTML(){
        return [{tag: 'div.custom-node'},];
    }, 

    renderHTML(){
        return ['div', {class: 'custom-node'}]
    }, 

    addCommands(){
        return {
            insertCustomNode: () => ({commands}) => {
                return commands.insertContent('hello world')
            }, 
        }
    }, 

  addNodeView(){
    return ReactNodeViewRenderer(Image)
  }
})