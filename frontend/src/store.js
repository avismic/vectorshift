import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

const STORAGE_KEY = "flow-graph-v1";

function loadPersistedState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.warn("Failed to load persisted flow state:", err);
  }
  return { nodes: [], edges: [], logs: [], theme: "light" };
}

export const useStore = create((set, get) => {
  const {
    nodes: initNodes,
    edges: initEdges,
    logs: initLogs,
    theme: initTheme,
  } = loadPersistedState();

  return {
    nodes: initNodes,
    edges: initEdges,
    theme: initTheme,
    isModalOpen: false,
    modalData: {},
    logs: initLogs,

    toggleTheme: () => {
      set((state) => ({ theme: state.theme === "light" ? "dark" : "light" }));
      get().persist();
    },

    openModal: (data) => set({ isModalOpen: true, modalData: data }),
    closeModal: () => set({ isModalOpen: false }),

    addLog: (message) => {
      const now = new Date();
      const timestamp = `${now.getDate()}:${
        now.getMonth() + 1
      }:${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      const logEntry = `[${timestamp}] ${message}`;
      set((state) => ({ logs: [logEntry, ...(state.logs || [])] }));
      get().persist();
    },

    persist: () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          nodes: get().nodes,
          edges: get().edges,
          logs: get().logs,
          theme: get().theme,
        })
      );
    },

    setNodes: (nodes) => {
      set({ nodes });
      get().persist();
    },
    setEdges: (edges) => {
      set({ edges });
      get().persist();
    },

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
        get().addLog(`removed ${nodeToDelete.type}`);
      }

      const filteredNodes = get().nodes.filter((n) => n.id !== nodeId);
      const filteredEdges = get().edges.filter(
        (e) => e.source !== nodeId && e.target !== nodeId
      );
      set({ nodes: filteredNodes, edges: filteredEdges });
      get().persist();
    },

    duplicateNode: (nodeId) => {
      const { nodes, getNodeID, addNode } = get();
      const nodeToDuplicate = nodes.find((node) => node.id === nodeId);

      if (!nodeToDuplicate) return;

      const newNode = {
        ...nodeToDuplicate,
        id: getNodeID(nodeToDuplicate.type),
        position: {
          x: nodeToDuplicate.position.x + 30,
          y: nodeToDuplicate.position.y + 30,
        },
        selected: false,
      };

      addNode(newNode);
    },

    resetCanvas: () => {
      set({
        nodes: [],
        edges: [],
        logs: [],
      });
      get().persist();
    },
  };
});
