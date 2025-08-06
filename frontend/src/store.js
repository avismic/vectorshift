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
  return { nodes: [], edges: [], logs: [] };
}

export const useStore = create((set, get) => {
  const {
    nodes: initNodes,
    edges: initEdges,
    logs: initLogs,
  } = loadPersistedState();

  return {
    // Hydrate initial state
    nodes: initNodes,
    edges: initEdges,
    theme: "light",
    isModalOpen: false,
    modalData: {},
    logs: initLogs,

    toggleTheme: () =>
      set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
    openModal: (data) => set({ isModalOpen: true, modalData: data }),
    closeModal: () => set({ isModalOpen: false }),

    addLog: (message) => {
      const now = new Date();
      // Format timestamp to match your example: D:M:YYYY HH:MM:SS
      const timestamp = `${now.getDate()}:${
        now.getMonth() + 1
      }:${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      const logEntry = `[${timestamp}] ${message}`;
      // Prepend new logs to the start of the array
      set((state) => ({ logs: [logEntry, ...(state.logs|| [])] }));
      get().persist();
    },

    // Persist helper
    persist: () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          nodes: get().nodes,
          edges: get().edges,
          logs: get().logs,
        })
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
      get().addLog(`added ${node.type}`);
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
      const nodeToDelete = get().nodes.find((n) => n.id === nodeId);
      if (nodeToDelete) {
        get().addLog(`removed ${nodeToDelete.type}`); // <-- Add this log call
      }

      const filteredNodes = get().nodes.filter((n) => n.id !== nodeId);
      const filteredEdges = get().edges.filter(
        (e) => e.source !== nodeId && e.target !== nodeId
      );
      set({ nodes: filteredNodes, edges: filteredEdges });
      get().persist();
    },

    resetCanvas: () => {
      set({
        nodes: [],
        edges: [],
        logs: [], // This will clear the logs
      });
      get().persist(); // This saves the empty canvas to local storage
    },
  };
});
