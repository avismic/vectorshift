import { useStore } from "../store";
import { shallow } from "zustand/shallow";
import {
  nodeStyles,
  headerStyles,
  baseNodeCopyButtonStyle,
  contentStyles,
  deleteButtonStyle,
} from "./nodeStyles";

const selector = (state) => ({
  theme: state.theme,
  deleteNode: state.deleteNode,
  duplicateNode: state.duplicateNode,
});

export const BaseNode = ({ id, data }) => {
  const { theme, deleteNode, duplicateNode } = useStore(selector, shallow);

  return (
    <div style={nodeStyles(theme)}>
      <button
        style={baseNodeCopyButtonStyle(theme)}
        onClick={() => duplicateNode(id)}
        title="Duplicate Node"
      >
        ⿻
      </button>
      <button style={deleteButtonStyle(theme)} onClick={() => deleteNode(id)}>
        x
      </button>
      <div style={headerStyles}>
        <strong>{data.title || "Node"}</strong>
      </div>
      <div style={contentStyles}>{data.content}</div>
    </div>
  );
};
