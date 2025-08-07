import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  theme: state.theme,
});

export const DraggableNode = ({ type, label }) => {
    const { theme } = useStore(selector, shallow);
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    const style = {
      cursor: 'grab',
      minWidth: '120px',
      padding: '10px',
      borderRadius: '8px',
      background: theme === 'light' ? '#2D2D2D' : '#FFFFFF',
      color: theme === 'light' ? '#FFFFFF' : '#000000',
      border: '1px solid #555',
      textAlign: 'center',
      fontWeight: 'bold'
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={style} 
        draggable
      >
        <span>{label}</span>
      </div>
    );
  };