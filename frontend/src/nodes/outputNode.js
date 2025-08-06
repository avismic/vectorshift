import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };
  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
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
    title: 'Output',
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
          <select value={outputType} onChange={handleTypeChange} style={inputStyle}>
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    ),
    handles: [
      { type: 'target', position: Position.Left, id: `${id}-value` }
    ]
  };

  return (
    <BaseNode id={id} data={nodeData} />
  );
};