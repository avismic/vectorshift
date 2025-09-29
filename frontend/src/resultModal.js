import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { overlayStyle, modalStyle, buttonStyleModal } from "./nodes/nodeStyles";

const selector = (state) => ({
  isModalOpen: state.isModalOpen,
  modalData: state.modalData,
  closeModal: state.closeModal,
  theme: state.theme,
});

export const ResultModal = () => {
  const { isModalOpen, modalData, closeModal, theme } = useStore(
    selector,
    shallow
  );

  if (!isModalOpen) {
    return null;
  }

  return (
    <div style={overlayStyle} onClick={closeModal}>
      <div style={modalStyle(theme)} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginTop: 0 }}>Pipeline Analysis Complete</h2>
        <p>
          <strong>Number of Nodes:</strong> {modalData.num_nodes}
        </p>
        <p>
          <strong>Number of Edges:</strong> {modalData.num_edges}
        </p>
        <p>
          <strong>Is a DAG:</strong> {String(modalData.is_dag)}
        </p>
        <button style={buttonStyleModal} onClick={closeModal}>
          OK
        </button>
      </div>
    </div>
  );
};
