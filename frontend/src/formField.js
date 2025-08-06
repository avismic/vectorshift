import { Handle, Position } from 'reactflow';

export const FormField = ({ label, handleId, hasTarget, hasSource }) => {
  
  const fieldStyle = {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    marginBottom: '5px',
  };

  const labelStyle = {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'left',
    flex: 1,
    paddingLeft: '10px',
    paddingRight: '10px',
  };

  return (
    <div style={fieldStyle}>
      {hasTarget && (
        <Handle 
          type="target" 
          position={Position.Left} 
          id={`${handleId}-input`}
        />
      )}
      <span style={labelStyle}>{label}</span>
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