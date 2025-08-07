import { GenericNode } from './genericNode';

const hashNodeConfig = {
  title: 'Hash Text',
  fields: [
    {
      name: 'input_text',
      type: 'textarea',
      defaultValue: '',
      placeholder: 'Text to hash...',
    },
    {
      name: 'algorithm',
      type: 'select',
      defaultValue: 'sha256',
      options: [
        { value: 'md5', label: 'MD5' },
        { value: 'sha1', label: 'SHA-1' },
        { value: 'sha256', label: 'SHA-256' },
        { value: 'sha512', label: 'SHA-512' },
      ],
    },
    {
      name: 'secret_key',
      type: 'text',
      defaultValue: '',
      placeholder: 'HMAC Secret Key (optional)',
    },
  ],
  outputs: [
    { id: 'output', label: 'Output' },
  ],
};

export const HashNode = ({ id, data }) => {
  return <GenericNode id={id} data={data} config={hashNodeConfig} />;
};