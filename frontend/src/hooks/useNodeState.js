import { useState, useCallback } from 'react';
import { useStore } from '../store';

export const useNodeState = (nodeId, fieldName, initialValue) => {
  const { updateNodeData } = useStore();
  const initialData = useStore((state) => state.nodes.find(n => n.id === nodeId)?.data[fieldName]);

  const [value, setValue] = useState(initialData ?? initialValue);

  const handleChange = useCallback((e) => {
    const newValue = e.target.value;
    setValue(newValue);
    updateNodeData(nodeId, { [fieldName]: newValue });
  }, [nodeId, fieldName, updateNodeData]);

  return [value, handleChange];
};