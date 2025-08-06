import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

const variableRegex = /\{\{([a-zA-Z0-9_]+)\}\}/g;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || 'I am {{age}} years old');
  const [variables, setVariables] = useState([]);
  const [syncedWidth, setSyncedWidth] = useState(220);
  const mainTextareaRef = useRef(null);

  useEffect(() => {
    const newVariables = new Set();
    let match;
    while ((match = variableRegex.exec(currText)) !== null) {
      newVariables.add(match[1]);
    }
    setVariables(Array.from(newVariables));
  }, [currText]);
  
  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        setSyncedWidth(entry.contentRect.width);
      }
    });

    if (mainTextareaRef.current) {
      resizeObserver.observe(mainTextareaRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };
  
  const textareaStyle = {
    background: '#eee', 
    color: '#000', 
    borderRadius: '4px', 
    border: '1px solid #777', 
    padding: '5px', 
    resize: 'both',
  };

  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ marginBottom: '5px' }}>Text:</label>
        <textarea
          ref={mainTextareaRef}
          defaultValue={currText} 
          onChange={handleTextChange}
          rows={3}
          style={{ 
            ...textareaStyle,
            minHeight: '60px',
            width: `${syncedWidth}px`,
            minWidth: '220px'
          }}
        />
      </div>
      
      {variables.map((variableName, index) => (
        <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '5px' }}>{variableName}:</label>
          <textarea 
            rows={1}
            style={{ 
              ...textareaStyle,
              minHeight: '20px',
              width: `${syncedWidth}px`,
              minWidth: '220px'
            }}
          />
        </div>
      ))}
    </div>
  );
  
  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-output` },
    ...variables.map((variableName, index) => ({
      type: 'target',
      position: Position.Left,
      id: `${id}-${variableName}`,
      style: { top: `${(index + 2) * 30}%` } 
    }))
  ];

  const nodeData = {
    title: 'Text',
    content: content,
    handles: handles
  };

  return (
    <BaseNode id={id} data={nodeData} />
  );
};