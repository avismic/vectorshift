import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => {

  const llmData = {
    title: 'LLM',
    content: (
      <span style={{ fontFamily: 'Arial, sans-serif' }}>This is a LLM.</span>
    ),
    handles: [
      { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: '33%' } },
      { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: '66%' } },
      { type: 'source', position: Position.Right, id: `${id}-response` },
    ]
  };

  return (
    <BaseNode id={id} data={llmData} />
  );
};