import { useStore } from "../store";
import { shallow } from "zustand/shallow";

const selector = (state) => ({
  theme: state.theme,
  deleteNode: state.deleteNode,
  duplicateNode: state.duplicateNode,
});

export const BaseNode = ({ id, data }) => {
  const { theme, deleteNode, duplicateNode } = useStore(selector, shallow);

  const nodeStyles = {
    minWidth: "250px",
    background: theme === "light" ? "#2D2D2D" : "#FFFFFF",
    color: theme === "light" ? "#FFFFFF" : "#000000",
    border: "1px solid #555",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  };

  const headerStyles = {
    padding: "8px 10px",
    borderBottom: "2px solid #8661ff",
    textAlign: "center",
  };

  const copyButtonStyle = {
    position: "absolute",
    top: "5px",
    right: "30px",
    width: "20px",
    height: "20px",
    background: theme === "light" ? "#444" : "#ddd",
    color: theme === "light" ? "#fff" : "#000",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
  };

  const contentStyles = {
    padding: "10px",
  };

  const deleteButtonStyle = {
    position: "absolute",
    top: "5px",
    right: "5px",
    width: "20px",
    height: "20px",
    background: theme === "light" ? "#444" : "#ddd",
    color: theme === "light" ? "#fff" : "#000",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "bold",
  };

  return (
    <div style={nodeStyles}>
      <button
        style={copyButtonStyle}
        onClick={() => duplicateNode(id)}
        title="Duplicate Node"
      >
        ⿻
      </button>
      <button style={deleteButtonStyle} onClick={() => deleteNode(id)}>
        x
      </button>
      <div style={headerStyles}>
        <strong>{data.title || "Node"}</strong>
      </div>
      <div style={contentStyles}>{data.content}</div>
    </div>
  );
};
