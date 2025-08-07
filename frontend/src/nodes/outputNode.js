import { GenericNode } from './genericNode';

const outputNodeConfig = {
  title: 'Output',
  inputs: [
    { id: 'input', label: 'Input' },
  ],
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      defaultValue: 'output_1',
    },
    {
      name: 'outputType',
      label: 'Type',
      type: 'select',
      defaultValue: 'Text',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'Image', label: 'Image' },
      ],
    },
  ],
};
export const OutputNode = ({ id, data }) => {
  return <GenericNode id={id} data={data} config={outputNodeConfig} />;
};