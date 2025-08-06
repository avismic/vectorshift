import { useState } from 'react';
import { BaseNode } from './baseNode';
import { FormField } from '../formField';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState('input_1');
  const [inputType, setInputType] = useState('Text');

  const inputStyle = {
    background: '#eee', color: '#000', borderRadius: '4px',
    border: '1px solid #777', padding: '5px', width: '100%', boxSizing: 'border-box',
  };

  const nodeData = {
    title: 'Input',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <FormField label="Name" handleId={`${id}-name`} hasSource={true} />
          <input 
            type="text" 
            value={currName} 
            onChange={(e) => setCurrName(e.target.value)} 
            style={inputStyle}
          />
        </div>
        <div>
          <FormField label="Type" handleId={`${id}-type`} hasSource={true} />
          <select value={inputType} onChange={(e) => setInputType(e.target.value)} style={inputStyle}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </div>
      </div>
    ),
  };

  return (<BaseNode id={id} data={nodeData} />);
};