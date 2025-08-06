import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { RightSidebar } from './rightSidebar';
import { ReactFlowProvider } from 'reactflow';
import { ResultModal } from './resultModal';

const selector = (state) => ({
  theme: state.theme,
});

function App() {
  const { theme } = useStore(selector, shallow);

  const appStyle = {
    background: theme === 'light' ? '#ffffff' : '#121212',
    color: theme === 'light' ? '#000000' : '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
  };

  const leftSidebarStyle = {
    width: '200px',
    background: theme === 'light' ? '#f0f0f0' : '#2a2a2a',
    borderRight: '1px solid #444',
    flexShrink: 0,
  };

  const mainContentStyle = {
    flex: 1,
    minWidth: 0,
    position: 'relative',
  };

  const rightSidebarStyle = {
    width: '300px',
    background: theme === 'light' ? '#f0f0f0' : '#2a2a2a',
    borderLeft: '1px solid #444',
    flexShrink: 0,
  };

  return (
    <ReactFlowProvider>
      <div style={appStyle}>
        <div style={leftSidebarStyle}>
          <PipelineToolbar />
        </div>
        <div style={mainContentStyle}>
          <PipelineUI />
        </div>
        <div style={rightSidebarStyle}>
          <RightSidebar />
        </div>
        <ResultModal />
      </div>
    </ReactFlowProvider>
  );
}

export default App;