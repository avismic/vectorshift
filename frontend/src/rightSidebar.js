import { useCallback } from "react";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import {
  sidebarStyle,
  logsContainerStyle,
  controlsStyle,
  buttonStyle,
  logsDisplayBoxStyle,
  minimapPlaceholderStyle,
} from "./nodes/nodeStyles";

const selector = (state) => ({
  theme: state.theme,
  openModal: state.openModal,
  setNodes: state.setNodes,
  toggleTheme: state.toggleTheme,
  logs: state.logs,
  resetCanvas: state.resetCanvas,
});

export const RightSidebar = () => {
  const { theme, openModal, setNodes, toggleTheme, logs, resetCanvas } =
    useStore(selector, shallow);

  const handleStartClick = async () => {
    const { nodes, edges } = useStore.getState();
    const pipelineData = {
      nodes: nodes,
      edges: edges,
    };

    const formData = new FormData();
    formData.append("pipeline", JSON.stringify(pipelineData));

    try {
      const analysisResponse = await fetch(
        "http://localhost:8000/pipelines/parse",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!analysisResponse.ok) {
        throw new Error(`HTTP error! status: ${analysisResponse.status}`);
      }

      const analysisResult = await analysisResponse.json();
      openModal(analysisResult);

      const runResponse = await fetch("http://localhost:8000/pipelines/run", {
        method: "POST",
        body: formData,
      });

      if (!runResponse.ok) {
        throw new Error(`HTTP error! status: ${runResponse.status}`);
      }

      const runResult = await runResponse.json();
      setNodes(runResult.nodes);
    } catch (error) {
      console.error("Error during pipeline execution:", error);
      alert("An error occurred. See console for details.");
    }
  };

  return (
    <div style={sidebarStyle}>
      <div style={logsContainerStyle}>
        <strong>Controls</strong>
        <div style={controlsStyle}>
          <button style={buttonStyle(theme)} onClick={handleStartClick}>
            ▶
          </button>
          <button
            style={buttonStyle(theme)}
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            {theme === "light" ? "⏾" : "☀"}
          </button>
          <button
            style={buttonStyle(theme)}
            onClick={resetCanvas}
            title="Reset Canvas"
          >
            ⟳
          </button>
        </div>
        <strong>Logs</strong>
        <div style={logsDisplayBoxStyle(theme)}>
          {(logs || []).map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </div>
      <div style={minimapPlaceholderStyle}></div>
    </div>
  );
};
