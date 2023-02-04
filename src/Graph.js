import { useEffect, useRef } from "react";

import cytoscape from "cytoscape";
import { LAYOUT_OPTIONS, PANZOOM_OPTIONS } from "./constants";
import dagre from "cytoscape-dagre";
import fcose from "cytoscape-fcose";
import panzoom from "cytoscape-panzoom";
import "./panzoom.css";
import "cytoscape-panzoom/font-awesome-4.0.3/css/font-awesome.min.css";
import styles from "./styles";
try {
  cytoscape.use(dagre);
  cytoscape.use(fcose);
  panzoom(cytoscape);
} catch (e) {
  // eslint-disable-next-line
  console.warn("Warning: ", e);
}

const Graph = ({ data }) => {
  const networkRef = useRef(null);
  const cyRef = useRef(null);
  const createNetwork = () => {
    const cy = new cytoscape({
      layout: LAYOUT_OPTIONS.FCOSE,
      container: networkRef.current,
      maxZoom: 1e1,
      elements: { nodes: data.nodes, edges: data.edges },
      style: styles,
    });
    cy.panzoom(PANZOOM_OPTIONS);
    cyRef.current = cy;
  };

  const updateNetwork = (data) => {
    cyRef.current.json({ elements: { nodes: data.nodes, edges: data.edges } });
    cyRef.current.layout({ ...LAYOUT_OPTIONS.FCOSE }).run();
  };

  useEffect(() => {
    createNetwork();
  }, []);

  useEffect(() => {
    updateNetwork(data);
  }, [data]);

  return (
    <div
      style={{ height: "85vh", width: "100%", border: "1px solid #111" }}
      ref={networkRef}
    ></div>
  );
};

export default Graph;
