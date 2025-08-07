import { BaseNode } from './baseNode';
import { FormField } from '../formField';
import { useNodeState } from '../hooks/useNodeState';

const NodeInput = ({ id, field }) => {
  const [value, handleChange] = useNodeState(id, field.name, field.defaultValue);

  const inputStyle = {
    background: '#eee',
    color: '#000',
    borderRadius: '4px',
    border: '1px solid #777',
    padding: '8px',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: field.type === 'textarea' ? 'monospace' : 'inherit',
    resize: field.type === 'textarea' ? 'both' : 'none',
  };

  if (field.type === 'select') {
    return (
      <select value={value} onChange={handleChange} style={inputStyle}>
        {field.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
    );
  }

  if (field.type === 'textarea') {
    return (
      <textarea
        placeholder={field.placeholder}
        value={value}
        onChange={handleChange}
        style={{...inputStyle, minHeight: '80px'}}
      />
    );
  }

  return (
    <input
      type={field.type || 'text'}
      placeholder={field.placeholder}
      value={value}
      onChange={handleChange}
      style={inputStyle}
    />
  );
};

export const GenericNode = ({ id, data, config }) => {
  const nodeData = {
    title: config.title,
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {config.inputs?.map(handle => <FormField key={handle.id} label={handle.label} handleId={`${id}-${handle.id}`} hasTarget={true} />)}

        {config.fields.map((field) => (
          <div key={field.name}>
            {field.label && <label style={{ display: 'block', marginBottom: '5px' }}>{field.label}</label>}
            <NodeInput id={id} field={field} />
          </div>
        ))}
        
        {config.outputs?.map(handle => <FormField key={handle.id} label={handle.label} handleId={`${id}-${handle.id}`} hasSource={true} />)}
      </div>
    ),
  };

  return <BaseNode id={id} data={nodeData} />;
};