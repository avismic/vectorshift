import { GenericNode } from './genericNode';

const changeCaseNodeConfig = {
  title: 'Change Case',
  inputs: [
    { id: 'input', label: 'Input' },
  ],
  fields: [
    {
      name: 'operation',
      type: 'select',
      defaultValue: 'uppercase',
      options: [
        { value: 'uppercase', label: 'UPPERCASE' },
        { value: 'lowercase', label: 'lowercase' },
        { value: 'titlecase', label: 'Title Case' },
        { value: 'capitalize', label: 'Capitalize' },
      ],
    },
  ],
  outputs: [
    { id: 'output', label: 'Output' },
  ],
};

export const ChangeCaseNode = ({ id, data }) => {
  return <GenericNode id={id} data={data} config={changeCaseNodeConfig} />;
};