
// src/store.js
import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

// Key under which we persist the graph
const STORAGE_KEY = "flow-graph-v1";

// Try to load persisted state, fallback to empty graph
function loadPersistedState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.warn("Failed to load persisted flow state:", err);
  }
  return { nodes: [], edges: [] };
}

export const useStore = create((set, get) => {
  const { nodes: initNodes, edges: initEdges } = loadPersistedState();

  return {
    // Hydrate initial state
    nodes: initNodes,
    edges: initEdges,
    theme: "light",
    isModalOpen: false,
    modalData: {},

    toggleTheme: () =>
      set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
    openModal: (data) => set({ isModalOpen: true, modalData: data }),
    closeModal: () => set({ isModalOpen: false }),

    // Persist helper
    persist: () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ nodes: get().nodes, edges: get().edges })
      );
    },

    // Core setters now persist after updating state
    setNodes: (nodes) => {
      set({ nodes });
      get().persist();
    },
    setEdges: (edges) => {
      set({ edges });
      get().persist();
    },

    // Other actions
    getNodeID: (type) => {
      const newIDs = { ...get().nodeIDs };
      if (newIDs[type] === undefined) newIDs[type] = 0;
      newIDs[type] += 1;
      set({ nodeIDs: newIDs });
      return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
      set({ nodes: [...get().nodes, node] });
      get().persist();
    },
    onNodesChange: (changes) => {
      const updated = applyNodeChanges(changes, get().nodes);
      get().setNodes(updated);
    },
    onEdgesChange: (changes) => {
      const updated = applyEdgeChanges(changes, get().edges);
      get().setEdges(updated);
    },
    onConnect: (connection) => {
      const newEdges = addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: "20px", width: "20px" },
        },
        get().edges
      );
      get().setEdges(newEdges);
    },
    updateNodeData: (nodeId, newData) => {
      const updated = get().nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      );
      set({ nodes: updated });
      get().persist();
    },
    deleteNode: (nodeId) => {
      const filteredNodes = get().nodes.filter((n) => n.id !== nodeId);
      const filteredEdges = get().edges.filter(
        (e) => e.source !== nodeId && e.target !== nodeId
      );
      set({ nodes: filteredNodes, edges: filteredEdges });
      get().persist();
    },
  };
});
