import { PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import { Extension } from "@tiptap/react";

 const HoverIconExtension = Extension.create({
    name: 'hoverIcon', 

    addProseMirrorPlugins(){
        return[
            new Plugin({
               key: new PluginKey('hoverIcon'), 
               props: {
                decorations: (state) => {
                    const {doc} = state
                    const decorations = []

                    doc.descendants((node, pos) => {
                        if(node.type.name === 'paragraph' || node.type.name === ' heading'){
                            decorations.push(
                                Decoration.widget(pos, () => {
                                    const icon = document.createElement('div')
                                    icon.className = 'hover-icon'
                                    icon.innerHTML = '+'
                                    return icon
                                })
                            )
                        }
                    })
                    return DecorationSet.create(doc, decorations)
                }
               } 
            })
        ]
    }
 })

 export {
 HoverIconExtension, 
 }