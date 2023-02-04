const nodeStyles = [
  {
    selector: "node",
    style: {
      content: "data(id)",
      "background-image": "data(image)",
      "background-fit": "cover",
      "text-valign": "bottom",
      "text-halign": "center",
      "text-wrap": "wrap",
      "background-color": "data(color)",
      "text-overflow-wrap": "whitespace",
      "border-width": "data(borderWidth)",
      "border-color": "data(borderColor)",
    },
  },
  {
    selector: "node[label]",
    style: {
      label: "data(label)",
      "font-size": "0.5em",
    },
  },
  {
    selector: "edge[label]",
    style: {
      label: "data(label)",
      width: 1,
      "edge-text-rotation": "autorotate",
      "font-size": "0.5em",
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
    },
  },
];

const styles = [...nodeStyles, ...edgeStyles];

export default styles;
