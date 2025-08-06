import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  isModalOpen: state.isModalOpen,
  modalData: state.modalData,
  closeModal: state.closeModal,
  theme: state.theme,
});

export const ResultModal = () => {
  const { isModalOpen, modalData, closeModal, theme } = useStore(selector, shallow);

  if (!isModalOpen) {
    return null;
  }

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const modalStyle = {
    background: theme === 'light' ? '#ffffff' : '#2D2D2D',
    color: theme === 'light' ? '#000000' : '#ffffff',
    padding: '20px 40px',
    borderRadius: '8px',
    minWidth: '300px',
    fontFamily: 'Arial, sans-serif',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    marginTop: '20px',
    background: '#8A2BE2',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  return (
    <div style={overlayStyle} onClick={closeModal}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginTop: 0 }}>Pipeline Analysis Complete</h2>
        <p><strong>Number of Nodes:</strong> {modalData.num_nodes}</p>
        <p><strong>Number of Edges:</strong> {modalData.num_edges}</p>
        <p><strong>Is a DAG:</strong> {String(modalData.is_dag)}</p>
        <button style={buttonStyle} onClick={closeModal}>OK</button>
      </div>
    </div>
  );
};