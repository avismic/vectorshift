import { GenericNode } from "./genericNode";

const mathNodeConfig = {
  title: "Math",
  fields: [
    { name: "A", label: "Value A", type: "number", defaultValue: "" },
    { name: "B", label: "Value B", type: "number", defaultValue: "" },
    {
      name: "operation",
      type: "select",
      defaultValue: "add",
      options: [
        { value: "add", label: "Add (+)" },
        { value: "subtract", label: "Subtract (-)" },
        { value: "multiply", label: "Multiply (*)" },
        { value: "divide", label: "Divide (/)" },
      ],
    },
  ],
  outputs: [{ id: "result-output", label: "Result" }],
};

export const MathNode = ({ id, data }) => {
  return <GenericNode id={id} data={data} config={mathNodeConfig} />;
};
