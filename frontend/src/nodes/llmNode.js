import { useState, useEffect } from "react";
import { BaseNode } from "./baseNode";
import { FormField } from "../formField";
import { useStore } from "../store";
import { textareaStyle, inputStyle } from "./nodeStyles";

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
