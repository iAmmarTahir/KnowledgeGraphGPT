import { useReducer, useState } from "react";
import Graph from "./Graph";
import main from "./prompt.txt";
import { v4 as uuidv4 } from "uuid";
import { graphReducer, initialState } from "./graphReducer";
import { ACTIONS } from "./actions";
import { getNodeColor } from "./util";
const DEFAULT_PARAMS = {
  model: "text-davinci-003",
  temperature: 0.3,
  max_tokens: 800,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
};

const OPENAI_API_KEY = "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";

const mp =
  " \n(John, knows, React); (John, knows, C++); (John, knows, Python); (John, good_at, Programming)";

const np =
  " \n(Ammar, knows, React); (Ammar, knows, C++); (Ammar, knows, Python); (Ammar, good_at, Programming)";

const cleanTuples = (tuples) => {
  const results = [];
  tuples = tuples.replace(/[()]+/g, "").replace(/\s/g, "");
  tuples = tuples.trim().split(";");
  tuples.forEach((tuple) => {
    results.push(tuple.split(","));
  });
  return results;
};

const tuplesToGraph = (tuples) => {
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

const restructureGraph = (graph) => {
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

function App() {
  const [prompt, setPrompt] = useState("");
  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const [graphState, dispatch] = useReducer(graphReducer, initialState);

  const fetchGraph = (query) => {
    fetch(main)
      .then((res) => res.text())
      .then((text) => text.replace("$prompt", prompt))
      .then((prompt) => {
        console.info(prompt);
        const params = { ...DEFAULT_PARAMS, prompt: prompt };
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(OPENAI_API_KEY),
          },
          body: JSON.stringify(params),
        };
        // const result = restructureGraph(tuplesToGraph(cleanTuples(mp)));
        // dispatch({ type: ACTIONS.ADD_NODES_AND_EDGES, payload: result });
        fetch("https://api.openai.com/v1/completions", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            const result = restructureGraph(
              tuplesToGraph(cleanTuples(data.choices[0].text))
            );
            dispatch({ type: ACTIONS.ADD_NODES_AND_EDGES, payload: result });
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };

  const handleSubmit = () => {
    fetchGraph(prompt);
  };

  const handleSecond = () => {
    const result = restructureGraph(tuplesToGraph(cleanTuples(np)));
    dispatch({ type: ACTIONS.ADD_NODES_AND_EDGES, payload: result });
  };
  return (
    <div className="App">
      <h1>Knowledge Graph GPT</h1>
      <input
        type="text"
        onChange={(e) => handlePromptChange(e)}
        value={prompt}
      />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleSecond}>Second</button>
      <Graph data={graphState} />
    </div>
  );
}

export default App;
