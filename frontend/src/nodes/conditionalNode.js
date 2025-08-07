import { GenericNode } from './genericNode';

const conditionalNodeConfig = {
  title: 'Conditional Router',
  inputs: [
    { id: 'input', label: 'Input' },
  ],
  fields: [
    {
      name: 'operator',
      type: 'select',
      defaultValue: '==',
      options: [
        { value: '==', label: 'Equals' },
        { value: '!=', label: 'Not Equals' },
        { value: '>', label: 'Greater Than' },
        { value: '<', label: 'Less Than' },
        { value: '>=', label: 'Greater Than or Equals' },
        { value: '<=', label: 'Less Than or Equals' },
        { value: 'contains', label: 'Contains' },
        { value: 'not contains', label: 'Not Contains' },
      ],
    },
    {
      name: 'comparison_value',
      type: 'text',
      defaultValue: '',
      placeholder: 'Value to compare against...',
    },
  ],
  outputs: [
    { id: 'true-output', label: 'True' },
    { id: 'false-output', label: 'False' },
  ],
};

export const ConditionalNode = ({ id, data }) => {
  return <GenericNode id={id} data={data} config={conditionalNodeConfig} />;
};