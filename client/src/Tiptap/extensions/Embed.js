import {
  Node,
  mergeAttributes,
  ReactNodeViewRenderer,
  PasteRule,
} from "@tiptap/react";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { TextSelection } from "@tiptap/pm/state";
import EmbedComponent from "./EmbedComp";

export default Node.create({
  name: "embed",
  group: "block",

  addOptions() {
    return { inline: false, HTMLAttributes: {} };
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? "inline" : "block";
  },

  addAttributes() {
    return {
      src: { default: null },
      title: { default: null },
      frameBorder: { default: "0" },
      allow: {
        default:
          "accelerometer; autoplay; clipboard-write, encrypted-media; gyroscope, picture-in-picture",
      },
      allowfullscreen: { default: "allowfullscreen" },
      figheight: {
        default: 281,
        parseHTML: (element) => element.getAttribute("figheight"),
      },

      figwidth: {
        default: 500,
        parseHTML: (element) => element.getAttribute("figwidth"),
      },
    };
  },

  renderHTML({ HTMLAttributes, node }) {
    const { figheight, figwidth } = node.attrs;
    return [
      "div",
      {
        class: `neeto-editor_video-wrapper neeto-editor_video--${align}`,
      },
      [
        "div",
        {
          class: "neeto-editor_video-iframe",
          style: `width: ${figwidth}px; height: ${figheight}px`,
        },
        [
          "iframe",
          mergeAttributes(this.options.HTMLAttributes, {
            ...HTMLAttributes,
          }),
        ],
      ],
    ];
  },

  addCommands() {
    return {
      setExternalVideo:
        (options) =>
        ({ commands }) => {
          commands.insertContent({ type: this.name, attrs: options });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(EmbedComponent);
  },

  parseHTML() {
    return [{ tag: "iframe[src]" }];
  },

  addPasteRules() {
    return [
      new PasteRule({
        find: "",
        handler: ({ state, range, match }) => {
          state.tr.delete(range.from, range.to);
          state.tr.setSelection(
            TextSelection.create(state.doc, range.from + 1)
          );

          const validateUrl = validateUrl(match[0]);
          if (validateUrl) {
            const node = state.schema.nodes["embed"].create({
              src: validateUrl,
            });
            state.tr.insert(range.from, range.to);
            state.tr.insert(
              range.from + node.nodeSize + 1,
              state.schema.nodes.paragraph.create()
            );
            state.tr.setSelection(
              TextSelection.create(state.tr.doc, range.from + node.nodeSize + 1)
            );
          }
        },
      }),
    ];
  },
});
