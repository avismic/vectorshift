import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };
  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const inputStyle = {
    background: '#eee',
    color: '#000',
    borderRadius: '4px',
    border: '1px solid #777',
    padding: '5px',
    width: '100%',
    boxSizing: 'border-box',
  };

  const nodeData = {
    title: 'Input',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>
          Name:
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange} 
            style={inputStyle}
          />
        </label>
        <label>
          Type:
          <select value={inputType} onChange={handleTypeChange} style={inputStyle}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    ),
    handles: [
      { type: 'source', position: Position.Right, id: `${id}-value` }
    ]
  };

  return (
    <BaseNode id={id} data={nodeData} />
  );
};