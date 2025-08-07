import { useState, useEffect } from "react";
import { BaseNode } from "./baseNode";
import { FormField } from "../formField";
import { useStore } from "../store";

const variableRegex = /\{\{([a-zA-Z0-9_]+)\}\}/g;

export const LLMNode = ({ id, data }) => {
  const { updateNodeData } = useStore();
  const [prompt, setPrompt] = useState(
    data?.prompt || "Describe {{topic}} in {{cLimit}} characters."
  );
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    const vars = new Set();
    let match;
    while ((match = variableRegex.exec(prompt)) !== null) {
      vars.add(match[1]);
    }
    setVariables(Array.from(vars));
    updateNodeData(id, { prompt });
  }, [prompt, id, updateNodeData]);

  const textareaStyle = {
    background: "#eee",
    color: "#000",
    borderRadius: "4px",
    border: "1px solid #777",
    padding: "5px",
    width: "100%",
    boxSizing: "border-box",
    resize: "both",
    minHeight: "60px",
  };

  const inputStyle = {
    background: "#eee",
    color: "#000",
    borderRadius: "4px",
    border: "1px solid #777",
    padding: "5px",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <BaseNode
      id={id}
      data={{
        title: "LLM",
        content: (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div>
              <FormField
                label="Prompt"
                handleId={`${id}-prompt`}
                hasTarget={true}
              />
              <textarea
                defaultValue={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                style={textareaStyle}
              />
            </div>

            {variables.map((varName) => (
              <div key={varName}>
                <FormField
                  label={varName}
                  handleId={`${id}-${varName}`}
                  hasTarget={true}
                />
                <input
                  type="text"
                  onChange={(e) =>
                    updateNodeData(id, { [varName]: e.target.value })
                  }
                  style={inputStyle}
                />
              </div>
            ))}

            <FormField
              label="Output"
              handleId={`${id}-output`}
              hasSource={true}
            />
          </div>
        ),
      }}
    />
  );
};
