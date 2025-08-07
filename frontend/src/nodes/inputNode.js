import { GenericNode } from './genericNode';

const inputNodeConfig = {
  title: 'Input',
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      defaultValue: 'input_1',
    },
    {
      name: 'inputType',
      label: 'Type',
      type: 'select',
      defaultValue: 'Text',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'File' },
      ],
    },
    {
      name: 'value',
      label: 'Value',
      type: 'textarea',
      defaultValue: '',
    },
  ],
  outputs: [
    { id: 'value-output', label: 'Value' },
  ],
};

export const InputNode = ({ id, data }) => {
  return <GenericNode id={id} data={data} config={inputNodeConfig} />;
};