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

  const textareaStyle = {
    background: "#eee",
    color: "#000",
    borderRadius: "4px",
    border: "1px solid #777",
    padding: "5px",
    width: "100%",
    boxSizing: "border-box",
    resize: "vertical",
    minHeight: "80px",
  };

  const nodeData = {
    title: "showText",
    content: (
      <div>
        <FormField label="input" handleId={`${id}-input`} hasTarget={true} />
        <textarea readOnly style={textareaStyle} value={value || ""} />
      </div>
    ),
  };

  return <BaseNode id={id} data={nodeData} />;
};
