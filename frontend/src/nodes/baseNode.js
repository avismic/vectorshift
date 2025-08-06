import { useStore } from '../store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  theme: state.theme,
});

export const BaseNode = ({ id, data }) => {
  const { theme } = useStore(selector, shallow);

  const nodeStyles = {
    minWidth: '250px',
    background: theme === 'light' ? '#2D2D2D' : '#FFFFFF',
    color: theme === 'light' ? '#FFFFFF' : '#000000',
    border: '1px solid #555',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
  };

  const headerStyles = {
    padding: '8px 10px',
    borderBottom: '2px solid #8A2BE2',
    textAlign: 'center',
  };

  const contentStyles = {
    padding: '10px',
  };

  return (
    <div style={nodeStyles}>
      <div style={headerStyles}>
        <strong>{data.title || 'Node'}</strong>
      </div>
      <div style={contentStyles}>
        {data.content}
      </div>
    </div>
  );
};