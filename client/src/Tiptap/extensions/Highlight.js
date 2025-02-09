import { Extension, Node, Mark } from "@tiptap/react";

export const HighlightExtension = Mark.create({
    name: 'highlight', // Unique name for the extension
  
    addOptions() {
      return {
        HTMLAttributes: {}, // Default HTML attributes
      };
    },
  
    addAttributes() {
      return {
        style: {
          default: null,
          parseHTML: (element) => element.getAttribute('style'),
          renderHTML: (attributes) => {
            if (!attributes.style) {
              return {};
            }
            return { style: attributes.style };
          },
        },
      };
    },
  
    parseHTML() {
      return [
        {
          tag: 'span',
          getAttrs: (node) => node.style.backgroundColor && null,
        },
      ];
    },
  
    renderHTML({ HTMLAttributes }) {
      return ['span', HTMLAttributes, 0];
    },
  
    addCommands() {
      return {
        setHighlight:
          (backgroundColor) =>
          ({ commands }) => {
            return commands.setMark('highlight', {
              style: `background-color: ${backgroundColor};`,
            });
          },
        unsetHighlight:
          () =>
          ({ commands }) => {
            return commands.unsetMark('highlight');
          },

        setBolding: () => ({commands}) =>{ 
          return commands.setBold(); 
        }
      };
    },
  });