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

