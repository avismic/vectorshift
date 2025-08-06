import { useState, useEffect } from 'react';
import { FormField } from '../formField';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

const variableRegex = /\{\{([a-zA-Z0-9_]+)\}\}/g;

export const TextNode = ({ id, data }) => {
  const { updateNodeData } = useStore();
  const [currText, setCurrText] = useState(data?.text || 'I am {{age}} years old');
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    const newVariables = new Set();
    let match;
    while ((match = variableRegex.exec(currText)) !== null) {
      newVariables.add(match[1]);
    }
    setVariables(Array.from(newVariables));
    updateNodeData(id, { text: currText });
  }, [currText, id, updateNodeData]);

  const textareaStyle = {
    background: '#eee', 
    color: '#000', 
    borderRadius: '4px', 
    border: '1px solid #777', 
    padding: '5px', 
    width: '100%',
    boxSizing: 'border-box',
    resize: 'vertical',
    minHeight: '60px',
  };

  return (
    <BaseNode id={id} data={{ title: 'Text', content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <FormField label="input" handleId={`${id}-main`} hasTarget={true} hasSource={true} />
          <textarea 
            defaultValue={currText}
            onChange={(e) => setCurrText(e.target.value)}
            style={textareaStyle}
          />
        </div>
        
        {variables.map((variableName) => (
          <div key={variableName}>
            <FormField label={variableName} handleId={`${id}-${variableName}`} hasTarget={true} hasSource={true} />
            <textarea 
              rows={1}
              style={{ ...textareaStyle, minHeight: '20px' }}
              onChange={(e) => updateNodeData(id, { [variableName]: e.target.value })}
            />
          </div>
        ))}
      </div>
    )}} />
  );
};