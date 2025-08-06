import { useCallback } from "react";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

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

  const sidebarStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    border:'solid #8661ff'
  };
  const logsContainerStyle = {
    flex: 1,
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
  };
  const controlsStyle = {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  };
  const buttonStyle = {
    padding: "8px 12px",
    fontSize: "16px",
    cursor: "pointer",
    border: "1px solid #555",
    borderRadius: "5px",
    background: theme === "light" ? "#e0e0e0" : "#333",
    color: theme === "light" ? "#000" : "#fff",
  };
  const logsDisplayBoxStyle = {
    flex: 1,
    background: theme === "light" ? "#e0e0e0" : "#333",
    borderRadius: "4px",
    padding: "5px",
    fontFamily: "monospace",
    overflowY: "auto",
    marginTop: "5px",
    border:'solid #8661ff',
  };
  const minimapPlaceholderStyle = {
    height: "200px",
    flexShrink: 0,
    borderTop: "1px solid #8661ff", 
  };

  return (
    <div style={sidebarStyle}>
      <div style={logsContainerStyle}>
        <strong>Controls</strong>
        <div style={controlsStyle}>
          <button style={buttonStyle} onClick={handleStartClick}>
            ▶
          </button>
          {/* <button style={buttonStyle}>⏸</button> */}
          <button
            style={buttonStyle}
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            {theme === "light" ? "⏾" : "☀"}
          </button>
          <button
            style={buttonStyle}
            onClick={resetCanvas}
            title="Reset Canvas"
          >
            ⟳
          </button>
        </div>
        <strong>Logs</strong>
        <div style={logsDisplayBoxStyle}>
          {(logs|| []).map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </div>
      <div style={minimapPlaceholderStyle}></div>
    </div>
  );
};
