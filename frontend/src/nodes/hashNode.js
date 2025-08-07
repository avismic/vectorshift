import { useState } from 'react';
import { BaseNode } from './baseNode';
import { FormField } from '../formField';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';

const selector = (id) => (state) => ({
  outputValue: state.nodes.find((n) => n.id === id)?.data.value,
});

export const HashNode = ({ id, data }) => {
  const { updateNodeData } = useStore();
  const { outputValue } = useStore(selector(id), shallow);

  const [inputText, setInputText] = useState(data.input_text || '');
  const [algorithm, setAlgorithm] = useState(data.algorithm || 'sha256');
  const [secretKey, setSecretKey] = useState(data.secret_key || '');
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    updateNodeData(id, { input_text: e.target.value });
  };

  const handleAlgorithmChange = (e) => {
    setAlgorithm(e.target.value);
    updateNodeData(id, { algorithm: e.target.value });
  };

  const handleSecretKeyChange = (e) => {
    setSecretKey(e.target.value);
    updateNodeData(id, { secret_key: e.target.value });
  };

  const handleCopy = () => {
    if (!outputValue) return;

    const ta = document.createElement('textarea');
    ta.value = outputValue;
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    
    ta.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    
    document.body.removeChild(ta);
  };

  const inputStyle = {
    background: '#eee', color: '#000', borderRadius: '4px',
    border: '1px solid #777', padding: '8px', width: '100%',
    boxSizing: 'border-box', fontFamily: 'monospace',
  };

  const nodeData = {
    title: 'Hash Text',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <textarea
          value={inputText}
          onChange={handleInputChange}
          placeholder="Text to hash..."
          style={{ ...inputStyle, minHeight: '80px', resize: 'both' }}
        />
        <select value={algorithm} onChange={handleAlgorithmChange} style={inputStyle}>
          <option value="md5">MD5</option>
          <option value="sha1">SHA-1</option>
          <option value="sha256">SHA-256</option>
          <option value="sha512">SHA-512</option>
        </select>
        <input
          type="text"
          value={secretKey}
          onChange={handleSecretKeyChange}
          placeholder="HMAC Secret Key (optional)"
          style={inputStyle}
        />
        <FormField label="Output" handleId={`${id}-output`} hasSource={true} />

      </div>
    ),
  };

  return <BaseNode id={id} data={nodeData} />;
};
