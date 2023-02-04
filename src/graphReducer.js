import { ACTIONS } from "./actions";
import {
  colorNodes,
  generateNodeWeightMap,
  getDiffEdges,
  getDiffNodes,
} from "./util";

export const initialState = {
  nodes: [],
  edges: [],
  nodeWeightMap: {},
};

export const graphReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_NODES_AND_EDGES:
      const newNodes = getDiffNodes(action.payload.nodes, state.nodes);
      const newEdges = getDiffEdges(action.payload.edges, state.edges);
      const edges = [...state.edges, ...newEdges];
      const newNodeWeightMap = generateNodeWeightMap(
        edges,
        state.nodeWeightMap
      );
      const coloredNodes = colorNodes(
        [...state.nodes, ...newNodes],
        newNodeWeightMap
      );

      return {
        nodes: [...coloredNodes],
        edges: [...edges],
        nodeWeightMap: newNodeWeightMap,
      };
    case ACTIONS.CLEAR_GRAPH:
      return initialState;
    default:
      return state;
  }
};
