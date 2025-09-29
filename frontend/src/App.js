import React, { useState } from "react";
import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { RightSidebar } from "./rightSidebar";
import { ReactFlowProvider } from "reactflow";
import { ResultModal } from "./resultModal";
import {
  appStyle,
  leftSidebarStyle,
  mainContentStyle,
  rightSidebarStyle,
} from "./nodes/nodeStyles";

const selector = (state) => ({
  theme: state.theme,
});

function App() {
  const { theme } = useStore(selector, shallow);
  const [toolbarCollapsed, setToolbarCollapsed] = useState(false);
  const toggleToolbar = () => setToolbarCollapsed((c) => !c);
  return (
    <ReactFlowProvider>
      <div style={appStyle(theme)}>
        <div style={leftSidebarStyle(theme, toolbarCollapsed)}>
          <PipelineToolbar
            collapsed={toolbarCollapsed}
            onToggleCollapse={toggleToolbar}
          />
        </div>

        <div style={mainContentStyle}>
          <PipelineUI />
        </div>
        <div style={rightSidebarStyle(theme)}>
          <RightSidebar />
        </div>
        <ResultModal />
      </div>
    </ReactFlowProvider>
  );
}

export default App;
