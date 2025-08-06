import { useCallback } from 'react';
import { MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  theme: state.theme,
  openModal: state.openModal,
});

export const RightSidebar = () => {
  const { theme, openModal } = useStore(selector, shallow);

  const runFrontendPipeline = () => {
    const { nodes, edges, updateNodeData } = useStore.getState();

    edges.forEach(edge => {
      const sourceNode = nodes.find(node => node.id === edge.source);
      const targetNode = nodes.find(node => node.id === edge.target);

      if (sourceNode && targetNode && sourceNode.type === 'text' && targetNode.type === 'showText') {
        let resolvedText = sourceNode.data.text || '';
        const variableRegex = /\{\{([a-zA-Z0-9_]+)\}\}/g;
        
        let match;
        while ((match = variableRegex.exec(resolvedText)) !== null) {
          const variableName = match[1];
          const variableValue = sourceNode.data[variableName] || '';
          resolvedText = resolvedText.replace(new RegExp(`\\{\\{${variableName}\\}\\}`, 'g'), variableValue);
        }
        
        updateNodeData(targetNode.id, { value: resolvedText });
      }
    });
  };

  const handleStartClick = async () => {
    const { nodes, edges } = useStore.getState();
    
    const pipelineDataForAnalysis = {
      nodes: nodes.map(node => ({ id: node.id, type: node.type })),
      edges: edges.map(edge => ({ id: edge.id, source: edge.source, target: edge.target })),
    };
    
    const formData = new FormData();
    formData.append('pipeline', JSON.stringify(pipelineDataForAnalysis));

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      openModal(result);
      runFrontendPipeline(); 

    } catch (error) {
      console.error('Error sending data to backend:', error);
      alert('Error: Could not connect to the backend. See console for details.');
    }
  };
  
  const sidebarStyle = {
    display: 'flex', flexDirection: 'column', height: '100%',
  };
  const logsContainerStyle = {
    flex: 1, padding: '10px', display: 'flex', flexDirection: 'column', minHeight: 0,
  };
  const controlsStyle = {
    display: 'flex', gap: '10px', marginBottom: '10px',
  };
  const buttonStyle = {
    padding: '8px 12px', fontSize: '16px', cursor: 'pointer', border: '1px solid #555',
    borderRadius: '5px', background: theme === 'light' ? '#e0e0e0' : '#333',
    color: theme === 'light' ? '#000' : '#fff',
  };
  const logsDisplayBoxStyle = {
    flex: 1, background: theme === 'light' ? '#e0e0e0' : '#333',
    borderRadius: '4px', padding: '5px', fontFamily: 'monospace', overflowY: 'auto',
  };
  const minimapPlaceholderStyle = {
    height: '200px', flexShrink: 0, borderTop: '1px solid #444',
  };
  const nodeColor = useCallback((node) => {
    return theme === 'light' ? '#2D2D2D' : '#FFFFFF';
  }, [theme]);

  return (
    <div style={sidebarStyle}>
      <div style={logsContainerStyle}>
        <strong>Controls</strong>
        <div style={controlsStyle}>
          <button style={buttonStyle} onClick={handleStartClick}>▶</button>
          <button style={buttonStyle}>⏸</button>
        </div>
        <strong>Logs</strong>
        <div style={logsDisplayBoxStyle}></div>
      </div>
      <div style={minimapPlaceholderStyle}>
        <MiniMap nodeColor={nodeColor} />
      </div>
    </div>
  );
};