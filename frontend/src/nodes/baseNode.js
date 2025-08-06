// frontend/src/nodes/BaseNode.js
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  theme: state.theme,
});

export const BaseNode = ({ id, data }) => {
  const { theme } = useStore(selector, shallow);

  const nodeStyles = {
    minWidth: '250px',
    minHeight: '150px', // Added: Sets a minimum height
    background: theme === 'light' ? '#2D2D2D' : '#FFFFFF',
    color: theme === 'light' ? '#FFFFFF' : '#000000',
    border: '1px solid #555',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
    display: 'flex', // Added: Use flexbox for internal layout
    flexDirection: 'column', // Added: Stack children vertically
  };

  const headerStyles = {
    padding: '8px 10px',
    borderBottom: '2px solid #8A2BE2',
  };

  // Changed: Let content area grow to fill available space
  const contentStyles = {
    padding: '10px',
    flex: 1, 
  };

  return (
    <div style={nodeStyles}>
      <div style={headerStyles}>
        <strong>{data.title || 'Node'}</strong>
      </div>
      <div style={contentStyles}>
        {data.content}
      </div>
      {data.handles && data.handles.map((handle) => (
        <Handle
          key={handle.id}
          id={handle.id}
          type={handle.type}
          position={handle.position}
          style={handle.style}
        />
      ))}
    </div>
  );
};