import { useState } from 'react';
import { BaseNode } from './baseNode';
import { FormField } from '../formField';
import { useStore } from '../store';

export const ConditionalNode = ({ id, data }) => {
  const { updateNodeData } = useStore();

  const [operator, setOperator] = useState(data.operator || '==');
  const [comparisonValue, setComparisonValue] = useState(data.comparison_value || '');

  const handleOperatorChange = (e) => {
    setOperator(e.target.value);
    updateNodeData(id, { operator: e.target.value });
  };
  
  const handleComparisonChange = (e) => {
    setComparisonValue(e.target.value);
    updateNodeData(id, { comparison_value: e.target.value });
  };

  const inputStyle = {
    background: '#eee', color: '#000', borderRadius: '4px',
    border: '1px solid #777', padding: '8px', width: '100%', boxSizing: 'border-box',
  };

  const nodeData = {
    title: 'Conditional Router',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <FormField label="Input" handleId={`${id}-input`} hasTarget={true} />

        <select value={operator} onChange={handleOperatorChange} style={inputStyle}>
          <option value="==">Equals</option>
          <option value="!=">Not Equals</option>
          <option value=">">Greater Than</option>
          <option value="<">Less Than</option>
          <option value=">=">Greater Than or Equals</option>
          <option value="<=">Less Than or Equals</option>
          <option value="contains">Contains</option>
          <option value="not contains">Not Contains</option>
        </select>

        <input
          type="text"
          placeholder="Value to compare against..."
          value={comparisonValue}
          onChange={handleComparisonChange}
          style={inputStyle}
        />

        <FormField label="True" handleId={`${id}-true-output`} hasSource={true} />
        <FormField label="False" handleId={`${id}-false-output`} hasSource={true} />
      </div>
    ),
  };

  return <BaseNode id={id} data={nodeData} />;
};
