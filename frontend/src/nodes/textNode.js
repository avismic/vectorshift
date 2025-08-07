import { useState, useEffect, useRef } from 'react'; // 1. Import useRef
import { FormField } from '../formField';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

const variableRegex = /\{\{([a-zA-Z0-9_]+)\}\}/g;

export const TextNode = ({ id, data }) => {
  const { updateNodeData } = useStore();
  const [currText, setCurrText] = useState(data?.text || 'I am {{age}} years old');
  const [variables, setVariables] = useState([]);
  const mainTextareaRef = useRef(null); // 2. Create a ref for the main textarea

  // This function will handle resizing the textarea
  const autoResizeTextarea = () => {
    const textarea = mainTextareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height to shrink if needed
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height to content
    }
  };

  useEffect(() => {
    const newVariables = new Set();
    let match;
    while ((match = variableRegex.exec(currText)) !== null) {
      newVariables.add(match[1]);
    }
    setVariables(Array.from(newVariables));
    updateNodeData(id, { text: currText });

    // 4. Trigger resize whenever text changes
    autoResizeTextarea(); 
  }, [currText, id, updateNodeData]);

  // 3. Handle text change and trigger resize
  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const textareaStyle = {
    background: '#eee', 
    color: '#000', 
    borderRadius: '4px', 
    border: '1px solid #777', 
    padding: '5px', 
    width: '100%',
    boxSizing: 'border-box',
    // resize: 'vertical', // 5. Removed manual resize
    minHeight: '60px',
    overflowY: 'hidden', // Hide the scrollbar
  };

  return (
    <BaseNode id={id} data={{ title: 'Text', content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <FormField label="input" handleId={`${id}-main`} hasTarget={true} hasSource={true} />
          <textarea 
            ref={mainTextareaRef} // 2. Attach the ref
            value={currText} // Changed from defaultValue to value for better control
            onChange={handleTextChange} // 3. Use the new handler
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