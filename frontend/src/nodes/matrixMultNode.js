import { GenericNode } from './genericNode';

const matrixMultNodeConfig = {
  title: 'Matrix Multiplication',
  fields: [
    {
      name: 'matrix_a',
      label: 'Matrix A',
      type: 'textarea',
      defaultValue: '',
      placeholder: '[[1, 2], [3, 4]]',
    },
    {
      name: 'matrix_b',
      label: 'Matrix B',
      type: 'textarea',
      defaultValue: '',
      placeholder: '[[5, 6], [7, 8]]',
    },
  ],
  outputs: [
    { id: 'result-output', label: 'Result' },
  ],
};

export const MatrixMultNode = ({ id, data }) => {
  return <GenericNode id={id} data={data} config={matrixMultNodeConfig} />;
};