import { DraggableNode } from "./draggableNode";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import {
  collapseBtnStyle,
  toolbarStyleOne,
  toolbarStyleTwo,
} from "./nodes/nodeStyles";

const selector = (state) => ({
  theme: state.theme,
  toggleTheme: state.toggleTheme,
});

export const PipelineToolbar = ({ collapsed, onToggleCollapse }) => {
  const { theme, toggleTheme } = useStore(selector, shallow);
  return (
    <div style={toolbarStyleOne}>
      <button onClick={onToggleCollapse} style={collapseBtnStyle}>
        {collapsed ? "›" : "‹"}
      </button>

      {!collapsed && (
        <>
          <h3 style={{ textAlign: "center", marginTop: "10px" }}>Nodes</h3>
          <div style={toolbarStyleTwo}>
            <DraggableNode type="customInput" label="Input" />
            <DraggableNode type="llm" label="LLM" />
            <DraggableNode type="customOutput" label="Output" />
            <DraggableNode type="text" label="Text" />
            <DraggableNode type="restApi" label="REST API" />
            <DraggableNode type="json" label="JSON" />
            <DraggableNode type="showText" label="Show Text" />
            <DraggableNode type="conditional" label="Router" />
            <DraggableNode type="changeCase" label="Change Case" />
            <DraggableNode type="math" label="Math" />
            <DraggableNode type="matrixMult" label="Matrix Multiply" />
            <DraggableNode type="hash" label="Hash Text" />
          </div>
        </>
      )}
    </div>
  );
};
