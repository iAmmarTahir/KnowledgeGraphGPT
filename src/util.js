import differenceBy from "lodash/differenceBy";
import { v4 as uuidv4 } from "uuid";

export const getDiffNodes = (newList, oldList) => {
  return differenceBy(newList, oldList, (node) => node.data.id);
};

export const getDiffEdges = (newList, oldList) => {
  return differenceBy(
    newList,
    oldList,
    (edge) => `${edge.data.source},${edge.data.target}`
  );
};

export const getNodeColor = (weight) => {
  const colors = [
    "#EF5350",
    "#EC407A",
    "#AB47BC",
    "#7E57C2",
    "#5C6BC0",
    "#42A5F5",
    "#29B6F6",
    "#26C6DA",
    "#26A69A",
    "#66BB6A",
    "#9CCC65",
    "#D4E157",
    "#FFEE58",
    "#FFCA28",
    "#FFA726",
    "#FF7043",
    "#8D6E63",
    "#8D6E63",
    "#78909C",
  ];
  return colors[weight % colors.length];
};

export const colorNodes = (nodes, nodeWeightMap) => {
  return nodes.map((node) => {
    return {
      data: {
        ...node.data,
        color: getNodeColor(nodeWeightMap[node.data.id]),
      },
    };
  });
};

export const generateNodeWeightMap = (edges, nodeWeightMap) => {
  const newNodeWeightMap = { ...nodeWeightMap };
  edges.forEach((edge) => {
    if (edge.data.source in newNodeWeightMap) {
      newNodeWeightMap[edge.data.source] += 1;
    } else {
      newNodeWeightMap[edge.data.source] = 0;
    }
    if (edge.data.target in newNodeWeightMap) {
      newNodeWeightMap[edge.data.target] += 1;
    } else {
      newNodeWeightMap[edge.data.target] = 0;
    }
  });
  return newNodeWeightMap;
};

export const cleanTuples = (tuples) => {
  const results = [];
  tuples = tuples.replace(/[()]+/g, "").replace(/\s/g, "");
  tuples = tuples.trim().split(";");
  tuples.forEach((tuple) => {
    results.push(tuple.split(","));
  });
  return results;
};

export const cleanJSONTuples = (data) => {
  const result = [];
  data.forEach((elem) => {
    const temp = [];
    Object.values(elem).forEach((val) => {
      temp.push(val);
    });
    result.push(temp);
  });
  return result;
};

export const tuplesToGraph = (tuples) => {
  const nodes = [];
  const edges = [];
  const nodeWeightMap = {};
  tuples.forEach((tuple) => {
    if (tuple.length === 3 && tuple[2] !== "True") {
      if (!nodeWeightMap.hasOwnProperty(tuple[0])) {
        nodeWeightMap[tuple[0]] = 1;
      } else {
        nodeWeightMap[tuple[0]] += 1;
      }
      if (!nodeWeightMap.hasOwnProperty(tuple[2])) {
        nodeWeightMap[tuple[2]] = 1;
      } else {
        nodeWeightMap[tuple[2]] += 1;
      }
      if (!nodes.includes(tuple[0])) {
        nodes.push(tuple[0]);
      }
      if (!nodes.includes(tuple[2])) {
        nodes.push(tuple[2]);
      }
      edges.push({ source: tuple[0], target: tuple[2], label: tuple[1] });
    }
  });
  return { edges, nodes, nodeWeightMap };
};

export const restructureGraph = (graph) => {
  const nodes = graph.nodes.map((node) => {
    return {
      data: {
        id: node,
        name: node,
        color: getNodeColor(graph.nodeWeightMap[node]),
      },
    };
  });
  const edges = graph.edges.map((edge) => {
    return { data: { id: uuidv4(), ...edge } };
  });
  return { nodes, edges };
};

export const exportData = (graphEdges) => {
  const data = graphEdges.map((edge) => {
    return {
      source: edge?.data?.source,
      relation: edge?.data?.label,
      target: edge?.data?.target,
    };
  });

  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(data)
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = "data.json";

  link.click();
};
