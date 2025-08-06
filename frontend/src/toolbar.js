import { DraggableNode } from "./draggableNode";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

const selector = (state) => ({
  theme: state.theme,
  toggleTheme: state.toggleTheme,
});

export const PipelineToolbar = ({ collapsed, onToggleCollapse }) => {
  const { theme, toggleTheme } = useStore(selector, shallow);

  const buttonStyle = {
    width: "80%",
    padding: "10px",
    background: "#8A2BE2",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",

  };

  const collapseBtnStyle = {
    position: "absolute",
    top: "8px",
    right: "4px",
    width: "30px",
    height: "30px",
    borderRadius: "30%",
    background: "#888",
    color: "white",
    border: "none",
    cursor: "pointer",
    
  };

  return (
    // <div
    //   style={{
    //     padding: "10px",
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //   }}
    // >

    <div
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        height: "100%",
        border:'solid #8661ff',
      }}
    >
      {/* collapse/expand toggle */}
      <button onClick={onToggleCollapse} style={collapseBtnStyle}>
        {collapsed ? "›" : "‹"}
      </button>

      {!collapsed && (
        <>
          <h3 style={{ textAlign: "center", marginTop: "10px" }}>Nodes</h3>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <DraggableNode type="customInput" label="Input" />
            <DraggableNode type="llm" label="LLM" />
            <DraggableNode type="customOutput" label="Output" />
            <DraggableNode type="text" label="Text" />
            <DraggableNode type="restApi" label="REST API" />
            <DraggableNode type="json" label="JSON" /> 
            <DraggableNode type="showText" label="Show Text" />
          </div>
        </>
      )}
      {/* <button onClick={toggleTheme} style={buttonStyle}>
        Toggle to {theme === "light" ? "Dark" : "Light"} Mode
      </button> */}
    </div>
  );
};
