import { useState } from 'react';
import { BaseNode } from './baseNode';
import { FormField } from '../formField';
import { useStore } from '../store';
import { textareaStyle, errorStyle } from './nodeStyles';


export const JSONNode = ({ id, data }) => {
  const [keys, setKeys] = useState(data.keys || []);
  const [error, setError] = useState('');
  const { updateNodeData } = useStore();
  const handleTextChange = (e) => {
    const text = e.target.value;
    try {
      if (text.trim() === '') {
        setKeys([]);
        setError('');
        updateNodeData(id, { keys: [] });
        return;
      }
      const parsed = JSON.parse(text);
      if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
        const newKeys = Object.keys(parsed);
        setKeys(newKeys);
        setError('');
        updateNodeData(id, { keys: newKeys, sampleJson: text });
      } else {
        setError('Input must be a valid JSON object (e.g., {"a": 1}).');
        setKeys([]);
        updateNodeData(id, { keys: [] });
      }
    } catch (err) {
      setError('Invalid JSON format.');
      setKeys([]);
      updateNodeData(id, { keys: [] });
    }
  };
  const nodeData = {
    title: 'JSON Parser',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
        {keys.map((key) => (
          <FormField
            key={key}
            label={key}
            handleId={`${id}-${key}-output`}
            hasSource={true}
          />
        ))}
      </div>
    ),
  };

  return <BaseNode id={id} data={nodeData} />;
};
