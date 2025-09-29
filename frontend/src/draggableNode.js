import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { draggablestyle } from "./nodes/nodeStyles";

const selector = (state) => ({
  theme: state.theme,
});

export const DraggableNode = ({ type, label }) => {
  const { theme } = useStore(selector, shallow);
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      style={draggablestyle(theme)}
      draggable
    >
      <span>{label}</span>
    </div>
  );
};
