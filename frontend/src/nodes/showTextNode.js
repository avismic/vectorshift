import { useState } from "react";
import { BaseNode } from "./baseNode";
import { FormField } from "../formField";
import { useStore } from "../store";
import { shallow } from "zustand/shallow";

export const ShowTextNode = ({ id, data }) => {
  const { value } = useStore(
    (state) => ({
      value: state.nodes.find((n) => n.id === id)?.data.value,
    }),
    shallow
  );

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = String(value || '');
    if (!textToCopy) return;

    const ta = document.createElement('textarea');
    ta.value = textToCopy;
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    
    ta.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    
    document.body.removeChild(ta);
  };

  const textareaStyle = {
    background: "#eee",
    color: "#000",
    borderRadius: "4px",
    border: "1px solid #777",
    padding: "5px",
    width: "100%",
    boxSizing: "border-box",
    resize: "both",
    minHeight: "80px",
  };

  const copyButtonStyle = {
    width: '100%',
    padding: '8px',
    background: copied ? '#4CAF50' : '#8A2BE2', 
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  };

  const nodeData = {
    title: "Show Text",
    content: (
      <div>
        <FormField label="input" handleId={`${id}-input`} hasTarget={true} />
        <textarea readOnly style={textareaStyle} value={value || ""} />
        
        <button
          onClick={handleCopy}
          style={copyButtonStyle}
          disabled={!value} 
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    ),
  };

  return <BaseNode id={id} data={nodeData} />;
};
