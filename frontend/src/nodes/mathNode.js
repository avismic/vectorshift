import { useState } from 'react';
import { BaseNode } from './baseNode';
import { FormField } from '../formField';
import { useStore } from '../store';

export const MathNode = ({ id, data }) => {
  const { updateNodeData } = useStore();

  const [operation, setOperation] = useState(data.operation || 'add');
  
  const [inputA, setInputA] = useState(data.A || '');
  const [inputB, setInputB] = useState(data.B || '');

  const handleOperationChange = (e) => {
    const newOperation = e.target.value;
    setOperation(newOperation);
    updateNodeData(id, { operation: newOperation });
  };

  const handleInputChangeA = (e) => {
    const newValue = e.target.value;
    setInputA(newValue);
    updateNodeData(id, { A: newValue });
  };

  const handleInputChangeB = (e) => {
    const newValue = e.target.value;
    setInputB(newValue);
    updateNodeData(id, { B: newValue });
  };

  const inputStyle = {
    background: '#eee',
    color: '#000',
    borderRadius: '4px',
    border: '1px solid #777',
    padding: '8px',
    width: '100%',
    boxSizing: 'border-box',
  };

  const nodeData = {
    title: 'Math',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Value A</label>
          <input
            type="number"
            value={inputA}
            onChange={handleInputChangeA}
            placeholder="Enter a number"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Value B</label>
          <input
            type="number"
            value={inputB}
            onChange={handleInputChangeB}
            placeholder="Enter a number"
            style={inputStyle}
          />
        </div>

        <select value={operation} onChange={handleOperationChange} style={inputStyle}>
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (-)</option>
          <option value="multiply">Multiply (*)</option>
          <option value="divide">Divide (/)</option>
        </select>

        <FormField label="Result" handleId={`${id}-result-output`} hasSource={true} />
      </div>
    ),
  };

  return <BaseNode id={id} data={nodeData} />;
};
