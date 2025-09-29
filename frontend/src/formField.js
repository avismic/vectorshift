import { Handle, Position } from "reactflow";
import { formFieldStyle, formLabelStyle } from "./nodes/nodeStyles";

export const FormField = ({ label, handleId, hasTarget, hasSource }) => {
  return (
    <div style={formFieldStyle}>
      {hasTarget && (
        <Handle
          type="target"
          position={Position.Left}
          id={`${handleId}-input`}
        />
      )}
      <span style={formLabelStyle}>{label}</span>
      {hasSource && (
        <Handle
          type="source"
          position={Position.Right}
          id={`${handleId}-output`}
        />
      )}
    </div>
  );
};
