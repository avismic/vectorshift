import { useState } from 'react';
import { BaseNode } from './baseNode';
import { FormField } from '../formField';

export const RestApiNode = ({ id, data }) => {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState('{}');
  const [body, setBody] = useState('{}');

  const inputStyle = {
    background: '#eee', color: '#000', borderRadius: '4px',
    border: '1px solid #777', padding: '5px', width: '100%', boxSizing: 'border-box',
  };

  const nodeData = {
    title: 'REST API',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <FormField label="Input" handleId={`${id}-input`} hasTarget={true} />
        <div>
          <label style={{ marginBottom: '5px', display: 'block' }}>URL:</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={{ marginBottom: '5px', display: 'block' }}>Method:</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)} style={inputStyle}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
          </select>
        </div>
        <FormField label="Success" handleId={`${id}-success`} hasSource={true} />
        <FormField label="Error" handleId={`${id}-error`} hasSource={true} />
      </div>
    ),
  };

  return (<BaseNode id={id} data={nodeData} />);
};