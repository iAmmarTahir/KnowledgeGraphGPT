import { ACTIONS } from "./actions";
import { getDiffEdges, getDiffNodes } from "./util";

export const initialState = {
  nodes: [],
  edges: [],
  nodesMap: [],
};

export const graphReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_NODES_AND_EDGES:
      const newNodes = getDiffNodes(action.payload.nodes, state.nodes);
      const newEdges = getDiffEdges(action.payload.edges, state.edges);
      return {
        nodes: [...state.nodes, ...newNodes],
        edges: [...state.edges, ...newEdges],
      };
    case ACTIONS.CLEAR_GRAPH:
      return initialState;
    default:
      return state;
  }
};
