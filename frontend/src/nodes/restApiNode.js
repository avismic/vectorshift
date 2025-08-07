import { GenericNode } from './genericNode';

const restApiNodeConfig = {
  title: 'REST API',
  inputs: [
    { id: 'input', label: 'Input' },
  ],
  fields: [
    {
      name: 'url',
      label: 'URL:',
      type: 'text',
      defaultValue: '',
    },
    {
      name: 'method',
      label: 'Method:',
      type: 'select',
      defaultValue: 'GET',
      options: [
        { value: 'GET', label: 'GET' },
        { value: 'POST', label: 'POST' },
        { value: 'PUT', label: 'PUT' },
      ],
    },
  ],
  outputs: [
    { id: 'success', label: 'Success' },
    { id: 'error', label: 'Error' },
  ],
};
export const RestApiNode = ({ id, data }) => {
  return <GenericNode id={id} data={data} config={restApiNodeConfig} />;
};