import { BaseNode } from './baseNode';
import { FormField } from '../formField';

export const LLMNode = ({ id, data }) => {

  const nodeData = {
    title: 'LLM',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <FormField label="System" handleId={`${id}-system`} hasTarget={true} />
        <FormField label="Prompt" handleId={`${id}-prompt`} hasTarget={true} />
        <FormField label="Response" handleId={`${id}-response`} hasSource={true} />
      </div>
    ),
  };

  return (<BaseNode id={id} data={nodeData} />);
};