import { DraggableNode } from './draggableNode';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  theme: state.theme,
  toggleTheme: state.toggleTheme,
});

export const PipelineToolbar = () => {
  const { theme, toggleTheme } = useStore(selector, shallow);

  const buttonStyle = {
    width: '80%',
    padding: '10px',
    background: '#8A2BE2',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  };

  return (
    <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3 style={{ textAlign: 'center', marginTop: '10px' }}>Nodes</h3>
      <div style={{ 
        marginTop: '20px', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        gap: '15px' 
      }}>
        <DraggableNode type='customInput' label='Input' />
        <DraggableNode type='llm' label='LLM' />
        <DraggableNode type='customOutput' label='Output' />
        <DraggableNode type='text' label='Text' />
        <DraggableNode type='restApi' label='REST API' />
        <DraggableNode type='showText' label='Show Text' />
      </div>
      <button onClick={toggleTheme} style={buttonStyle}>
        Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
};