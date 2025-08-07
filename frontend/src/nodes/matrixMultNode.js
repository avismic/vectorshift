import { useState } from 'react';
import { BaseNode } from './baseNode';
import { FormField } from '../formField';
import { useStore } from '../store';

export const MatrixMultNode = ({ id, data }) => {
  const { updateNodeData } = useStore();

  const [matrixA, setMatrixA] = useState(data.matrix_a || '');
  const [matrixB, setMatrixB] = useState(data.matrix_b || '');

  const handleMatrixAChange = (e) => {
    const newValue = e.target.value;
    setMatrixA(newValue);
    updateNodeData(id, { matrix_a: newValue });
  };

  const handleMatrixBChange = (e) => {
    const newValue = e.target.value;
    setMatrixB(newValue);
    updateNodeData(id, { matrix_b: newValue });
  };

  const textareaStyle = {
    background: '#eee',
    color: '#000',
    borderRadius: '4px',
    border: '1px solid #777',
    padding: '8px',
    width: '100%',
    boxSizing: 'border-box',
    resize: 'both',
    minHeight: '80px',
    fontFamily: 'monospace',
  };

  const nodeData = {
    title: 'Matrix Multiplication',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Matrix A</label>
          <textarea
            value={matrixA}
            onChange={handleMatrixAChange}
            placeholder="[[1, 2], [3, 4]]"
            style={textareaStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Matrix B</label>
          <textarea
            value={matrixB}
            onChange={handleMatrixBChange}
            placeholder="[[5, 6], [7, 8]]"
            style={textareaStyle}
          />
        </div>

        <FormField label="Result" handleId={`${id}-result-output`} hasSource={true} />
      </div>
    ),
  };

  return <BaseNode id={id} data={nodeData} />;
};
