const nodeStyles = [
  {
    selector: "node",
    style: {
      content: "data(id)",
      "text-valign": "bottom",
      "text-halign": "center",
      "text-wrap": "wrap",
      "background-color": "data(color)",
      "text-overflow-wrap": "whitespace",
      "font-size": "0.5em",
      "font-family": "Roboto",
    },
  },
  {
    selector: "node[label]",
    style: {
      label: "data(label)",
      "font-size": "0.5em",
      "font-family": "Roboto",
    },
  },
  {
    selector: "edge[label]",
    style: {
      label: "data(label)",
      width: 1,
      "edge-text-rotation": "autorotate",
      "font-size": "0.5em",
      "font-family": "Roboto",
    },
  },
];
const edgeStyles = [
  {
    selector: "edge",
    style: {
      "curve-style": "bezier",
      "target-arrow-shape": "triangle",
      "arrow-scale": 0.5,
      width: 1,
      content: "data(label)",
      "line-color": "#E0E0E0",
      "target-arrow-color": "#E0E0E0",
      "font-family": "Roboto",
    },
  },
];

const styles = [...nodeStyles, ...edgeStyles];

export default styles;
