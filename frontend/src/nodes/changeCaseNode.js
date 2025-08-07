import { useState } from 'react';
import { BaseNode } from './baseNode';
import { FormField } from '../formField';
import { useStore } from '../store';

export const ChangeCaseNode = ({ id, data }) => {
  const { updateNodeData } = useStore();

  const [operation, setOperation] = useState(data.operation || 'uppercase');

  const handleOperationChange = (e) => {
    const newOperation = e.target.value;
    setOperation(newOperation);
    updateNodeData(id, { operation: newOperation });
  };

  const selectStyle = {
    background: '#eee',
    color: '#000',
    borderRadius: '4px',
    border: '1px solid #777',
    padding: '8px',
    width: '100%',
    boxSizing: 'border-box',
  };

  const nodeData = {
    title: 'Change Case',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <FormField label="Input" handleId={`${id}-input`} hasTarget={true} />

        <select value={operation} onChange={handleOperationChange} style={selectStyle}>
          <option value="uppercase">UPPERCASE</option>
          <option value="lowercase">lowercase</option>
          <option value="titlecase">Title Case</option>
          <option value="capitalize">Capitalize</option>
        </select>

        <FormField label="Output" handleId={`${id}-output`} hasSource={true} />
      </div>
    ),
  };

  return <BaseNode id={id} data={nodeData} />;
};
