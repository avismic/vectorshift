import { useState } from 'react';
import { BaseNode } from './baseNode';
import { FormField } from '../formField';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState('output_1');
  const [outputType, setOutputType] = useState('Text');

  const inputStyle = {
    background: '#eee', color: '#000', borderRadius: '4px',
    border: '1px solid #777', padding: '5px', width: '100%', boxSizing: 'border-box',
  };

  const nodeData = {
    title: 'Output',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <FormField label="Name" handleId={`${id}-name`} hasTarget={true} />
          <input 
            type="text" 
            value={currName} 
            onChange={(e) => setCurrName(e.target.value)} 
            style={inputStyle}
          />
        </div>
        <div>
          <FormField label="Type" handleId={`${id}-type`} hasTarget={true} />
          <select value={outputType} onChange={(e) => setOutputType(e.target.value)} style={inputStyle}>
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </div>
      </div>
    ),
  };

  return (<BaseNode id={id} data={nodeData} />);
};