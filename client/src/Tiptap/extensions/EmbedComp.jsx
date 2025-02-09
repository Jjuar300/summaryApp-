import { NodeViewWrapper } from "@tiptap/react";
import { mergeRight } from "ramda";
import { Resizable } from "re-resizable";

const EmbedComponent = ({
  node,
  editor,
  getPos,
  updateAttibutes,
  deleteNode,
}) => {
  const { figheight, figwidth, align } = node.attrs;
  const { view } = editor;
  let height = figheight;
  let width = figwidth;

  const handleResize = (_event, _direction, ref) => {
    height = ref.offsetHeight;
    width = ref.offsetWidth;

    view.dispatch(
      view.state.tr.setNodeMarkup(
        getPos(),
        undefined,
        mergeRight(node.attrs, {
          figheight: height,
          figwidth: width,
          height,
          width,
        })
      )
    );

    editor.commands.focus();
  };

  return (
    <NodeViewWrapper
      className={`neeto-editor_video-wrapper neeto-editor_video--${align}`}
    >
      <Resizable
        lockAspectRatio
        className="neetor-editor_video-iframe"
        size={{ height, width }}
        onResizeStop={handleResize}
      >
        <iframe {...node.attrs} />
      </Resizable>
    </NodeViewWrapper>
  );
};

export default EmbedComponent;
