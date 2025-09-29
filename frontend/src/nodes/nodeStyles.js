const selector = (state) => ({
  theme: state.theme,
  openModal: state.openModal,
  setNodes: state.setNodes,
  toggleTheme: state.toggleTheme,
  logs: state.logs,
  resetCanvas: state.resetCanvas,
});

export const inputStyle = {
  background: "#eee",
  color: "#000",
  borderRadius: "4px",
  border: "1px solid #777",
  padding: "5px",
  width: "100%",
  boxSizing: "border-box",
};

export const errorStyle = {
  color: "red",
  fontSize: "12px",
  marginTop: "5px",
};

export const copyButtonStyle = (copied) => ({
  width: "100%",
  padding: "8px",
  background: copied ? "#4CAF50" : "#8A2BE2",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px",
  fontSize: "14px",
  fontWeight: "bold",
  transition: "background-color 0.3s ease",
});

export const textareaStyle = {
  background: "#eee",
  color: "#000",
  borderRadius: "4px",
  border: "1px solid #777",
  padding: "8px",
  width: "100%",
  boxSizing: "border-box",
  resize: "both",
  minHeight: "100px",
  fontFamily: "monospace",
};

export const sidebarStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  border: "solid #8661ff",
};

export const logsContainerStyle = {
  flex: 1,
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
};

export const controlsStyle = {
  display: "flex",
  gap: "10px",
  marginBottom: "10px",
};

export const buttonStyle = (theme) => ({
  padding: "8px 12px",
  fontSize: "16px",
  cursor: "pointer",
  border: "1px solid #555",
  borderRadius: "5px",
  background: theme === "light" ? "#e0e0e0" : "#333",
  color: theme === "light" ? "#000" : "#fff",
});

export const logsDisplayBoxStyle = (theme) => ({
  flex: 1,
  background: theme === "light" ? "#e0e0e0" : "#333",
  borderRadius: "4px",
  padding: "5px",
  fontFamily: "monospace",
  overflowY: "auto",
  marginTop: "5px",
  border: "solid #8661ff",
});

export const minimapPlaceholderStyle = {
  height: "200px",
  flexShrink: 0,
  borderTop: "1px solid #8661ff",
};

export const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

export const modalStyle = (theme) => ({
  background: theme === "light" ? "#ffffff" : "#2D2D2D",
  color: theme === "light" ? "#000000" : "#ffffff",
  padding: "20px 40px",
  borderRadius: "8px",
  minWidth: "300px",
  fontFamily: "Arial, sans-serif",
});

export const buttonStyleModal = {
  width: "100%",
  padding: "10px",
  marginTop: "20px",
  background: "#8A2BE2",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

export const draggablestyle = (theme) => ({
  cursor: "grab",
  minWidth: "120px",
  padding: "10px",
  borderRadius: "8px",
  background: theme === "light" ? "#2D2D2D" : "#FFFFFF",
  color: theme === "light" ? "#FFFFFF" : "#000000",
  border: "1px solid #555",
  textAlign: "center",
  fontWeight: "bold",
});

export const formFieldStyle = {
  display: "flex",
  alignItems: "center",
  position: "relative",
  width: "100%",
  marginBottom: "5px",
};

export const formLabelStyle = {
  fontFamily: "Arial, sans-serif",
  textAlign: "left",
  flex: 1,
  paddingLeft: "10px",
  paddingRight: "10px",
};

export const collapseBtnStyle = {
  position: "absolute",
  top: "8px",
  right: "4px",
  width: "30px",
  height: "30px",
  borderRadius: "30%",
  background: "#888",
  color: "white",
  border: "none",
  cursor: "pointer",
};

export const toolbarStyleOne = {
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  height: "100%",
  border: "solid #8661ff",
};

export const toolbarStyleTwo = {
  marginTop: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "15px",
};

export const appStyle = (theme) => ({
  background: theme === "light" ? "#ffffff" : "#121212",
  color: theme === "light" ? "#000000" : "#ffffff",
  display: "flex",
  flexDirection: "row",
  height: "100vh",
  width: "100vw",
  overflow: "hidden",
});

export const leftSidebarStyle = (theme, toolbarCollapsed) => ({
  width: toolbarCollapsed ? "30px" : "200px",
  overflow: "visible",
  transition: "width 0.3s ease",
  background: theme === "light" ? "#f0f0f0" : "#2a2a2a",
  borderRight: "1px solid #444",
  flexShrink: 0,
});

export const mainContentStyle = {
  flex: 1,
  minWidth: 0,
  position: "relative",
};

export const rightSidebarStyle = (theme) => ({
  width: "350px",
  background: theme === "light" ? "#f0f0f0" : "#2a2a2a",
  borderLeft: "1px solid #444",
  flexShrink: 0,
});

export const nodeStyles = (theme) => ({
  minWidth: "250px",
  background: theme === "light" ? "#2D2D2D" : "#FFFFFF",
  color: theme === "light" ? "#FFFFFF" : "#000000",
  border: "1px solid #555",
  borderRadius: "8px",
  fontFamily: "Arial, sans-serif",
  display: "flex",
  flexDirection: "column",
  position: "relative",
});

export const headerStyles = {
  padding: "8px 10px",
  borderBottom: "2px solid #8661ff",
  textAlign: "center",
};

export const baseNodeCopyButtonStyle = (theme) => ({
  position: "absolute",
  top: "5px",
  right: "30px",
  width: "20px",
  height: "20px",
  background: theme === "light" ? "#444" : "#ddd",
  color: theme === "light" ? "#fff" : "#000",
  border: "none",
  borderRadius: "50%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
});

export const contentStyles = {
  padding: "10px",
};

export const deleteButtonStyle = (theme) => ({
  position: "absolute",
  top: "5px",
  right: "5px",
  width: "20px",
  height: "20px",
  background: theme === "light" ? "#444" : "#ddd",
  color: theme === "light" ? "#fff" : "#000",
  border: "none",
  borderRadius: "50%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  fontWeight: "bold",
});

export const genericNodeInputStyle = (field) => ({
  background: "#eee",
  color: "#000",
  borderRadius: "4px",
  border: "1px solid #777",
  padding: "8px",
  width: "100%",
  boxSizing: "border-box",
  fontFamily: field.type === "textarea" ? "monospace" : "inherit",
  resize: field.type === "textarea" ? "both" : "none",
});
