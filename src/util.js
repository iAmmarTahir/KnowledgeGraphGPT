import differenceBy from "lodash/differenceBy";

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
