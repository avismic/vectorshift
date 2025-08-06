import { useCallback } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  theme: state.theme,
});

export const RightSidebar = () => {
  const { theme } = useStore(selector, shallow);

  const sidebarStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  const logsContainerStyle = {
    flex: 1,
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
  };

  const controlsStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
  };

  const buttonStyle = {
    padding: '8px 12px',
    fontSize: '16px',
    cursor: 'pointer',
    border: '1px solid #555',
    borderRadius: '5px',
    background: theme === 'light' ? '#e0e0e0' : '#333',
    color: theme === 'light' ? '#000' : '#fff',
  };

  const logsDisplayBoxStyle = {
    flex: 1,
    background: theme === 'light' ? '#e0e0e0' : '#333',
    borderRadius: '4px',
    padding: '5px',
    fontFamily: 'monospace',
    overflowY: 'auto',
  };

  const minimapPlaceholderStyle = {
    height: '200px',
    flexShrink: 0,
    borderTop: '1px solid #444',
  };

  return (
    <div style={sidebarStyle}>
      <div style={logsContainerStyle}>
        <strong>Controls</strong>
        <div style={controlsStyle}>
          <button style={buttonStyle}>▶</button>
          <button style={buttonStyle}>⏸</button>
        </div>
        <strong>Logs</strong>
        <div style={logsDisplayBoxStyle}>
        </div>
      </div>
      <div style={minimapPlaceholderStyle}>
      </div>
    </div>
  );
};