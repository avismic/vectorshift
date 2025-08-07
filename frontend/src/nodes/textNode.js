import { useState, useEffect, useRef } from "react";
import { FormField } from "../formField";
import { BaseNode } from "./baseNode";
import { useStore } from "../store";
import { textareaStyle } from "./nodeStyles";

const variableRegex = /\{\{([a-zA-Z0-9_]+)\}\}/g;

export const TextNode = ({ id, data }) => {
  const { updateNodeData } = useStore();
  const [currText, setCurrText] = useState(
    data?.text || "I am {{age}} years old"
  );
  const [variables, setVariables] = useState([]);
  const mainTextareaRef = useRef(null);
  const autoResizeTextarea = () => {
    const textarea = mainTextareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
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
    autoResizeTextarea();
  }, [currText, id, updateNodeData]);
  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={{
        title: "Text",
        content: (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div>
              <FormField
                label="input"
                handleId={`${id}-main`}
                hasTarget={true}
                hasSource={true}
              />
              <textarea
                ref={mainTextareaRef}
                value={currText}
                onChange={handleTextChange}
                style={textareaStyle}
              />
            </div>
            {variables.map((variableName) => (
              <div key={variableName}>
                <FormField
                  label={variableName}
                  handleId={`${id}-${variableName}`}
                  hasTarget={true}
                  hasSource={true}
                />
                <textarea
                  rows={1}
                  style={{ ...textareaStyle, minHeight: "20px" }}
                  onChange={(e) =>
                    updateNodeData(id, { [variableName]: e.target.value })
                  }
                />
              </div>
            ))}
          </div>
        ),
      }}
    />
  );
};
