import { useState } from 'react';
import { BaseNode } from './baseNode';
import { FormField } from '../formField';
import { useStore } from '../store';

export const JSONNode = ({ id, data }) => {
  // When the node is first created, its `data.keys` might be empty.
  // We use `data.keys || []` to prevent errors.
  const [keys, setKeys] = useState(data.keys || []);
  const [error, setError] = useState('');
  const { updateNodeData } = useStore();

  const handleTextChange = (e) => {
    const text = e.target.value;
    try {
      // If the textarea is empty, clear the outputs
      if (text.trim() === '') {
        setKeys([]);
        setError('');
        updateNodeData(id, { keys: [] });
        return;
      }
      
      const parsed = JSON.parse(text);
      
      // We only want to generate keys for JSON objects, not arrays or simple values.
      if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
        const newKeys = Object.keys(parsed);
        setKeys(newKeys);
        setError('');
        // Save the generated keys to the global store so they persist
        updateNodeData(id, { keys: newKeys, sampleJson: text });
      } else {
        setError('Input must be a valid JSON object (e.g., {"a": 1}).');
        setKeys([]);
        updateNodeData(id, { keys: [] });
      }
    } catch (err) {
      // Catch errors from invalid JSON
      setError('Invalid JSON format.');
      setKeys([]);
      updateNodeData(id, { keys: [] });
    }
  };

  const textareaStyle = {
    background: '#eee',
    color: '#000',
    borderRadius: '4px',
    border: '1px solid #777',
    padding: '8px',
    width: '100%',
    boxSizing: 'border-box',
    resize: 'vertical',
    minHeight: '100px',
    fontFamily: 'monospace',
  };

  const errorStyle = {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
  };

  const nodeData = {
    title: 'JSON Parser',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* This is the main input that receives data from other nodes */}
        <FormField label="Input" handleId={`${id}-input`} hasTarget={true} />

        <div>
          <label style={{ display: 'block', marginBottom: '5px', paddingLeft: '10px' }}>
            Sample JSON to generate outputs:
          </label>
          <textarea
            placeholder='{ "name": "John", "age": 30 }'
            onChange={handleTextChange}
            style={textareaStyle}
          />
          {error && <div style={errorStyle}>{error}</div>}
        </div>

        {/* Dynamically generated output handles for each key */}
        {keys.map((key) => (
          <FormField
            key={key}
            label={key}
            // The handleId must be unique for each output
            handleId={`${id}-${key}-output`}
            hasSource={true}
          />
        ))}
      </div>
    ),
  };

  return <BaseNode id={id} data={nodeData} />;
};
