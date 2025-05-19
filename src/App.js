import { useReducer, useState } from "react";
import Graph from "./Graph";
import main from "./prompt/prompt.txt";
import { graphReducer, initialState } from "./graphReducer";
import { ACTIONS } from "./actions";
import {
  cleanJSONTuples,
  cleanTuples,
  exportData,
  restructureGraph,
  tuplesToGraph,
} from "./util";
import "./App.css";
import { DEFAULT_PARAMS, LAYOUTS, requestOptions } from "./constants";
import GithubLogo from "./github-mark.png";
import LayoutSelector from "./LayoutSelector";

function App() {
  const [prompt, setPrompt] = useState("");
  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const [graphState, dispatch] = useReducer(graphReducer, initialState);

  const [option, setOptions] = useState(LAYOUTS.FCOSE);

  const [loading, setLoading] = useState(false);

  const [key, setKey] = useState("");
  const handleKeyChange = (e) => {
    setKey(e.target.value);
  };

  const [file, setFile] = useState("");

  const handleJSONImport = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      let data;
      try {
        data = JSON.parse(e.target.result);
      } catch (err) {
        console.info(err);
      }
      setFile(null);
      const result = restructureGraph(tuplesToGraph(cleanJSONTuples(data)));

      dispatch({ type: ACTIONS.ADD_NODES_AND_EDGES, payload: result });
    };
  };

  const fetchGraph = (query) => {
    setLoading(true);
    fetch(main)
      .then((res) => res.text())
      .then((text) => text.replace("$prompt", prompt))
      .then((prompt) => {
        const params = {
          ...DEFAULT_PARAMS,
          messages: [{ role: "system", content: prompt }],
        };
        fetch("https://api.openai.com/v1/chat/completions", {
          ...requestOptions,
          headers: {
            ...requestOptions.headers,
            Authorization: "Bearer " + key,
          },
          body: JSON.stringify(params),
        })
          .then((response) => response.json())
          .then((data) => {
            setLoading(false);
            const result = restructureGraph(
              tuplesToGraph(cleanTuples(data.choices[0].message.content))
            );
            dispatch({ type: ACTIONS.ADD_NODES_AND_EDGES, payload: result });
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      });
  };

  const handleSubmit = () => {
    fetchGraph(prompt);
  };

  // const handleSecond = () => {
  //   const result = restructureGraph(tuplesToGraph(cleanTuples(np)));
  //   dispatch({ type: ACTIONS.ADD_NODES_AND_EDGES, payload: result });
  // };

  return (
    <div className="App">
      <div className="mainContainer">
        <h1 className="title">KnowledgeGraph GPT</h1>
        <p className="text">
          The project aims to utilize OpenAI's GPT-3 model to convert
          unstructured text data into a structured knowledge graph
          representation.
        </p>
        <input
          type="password"
          onChange={(e) => handleKeyChange(e)}
          value={key}
          className="keyInput"
          placeholder="Enter your OpenAI API Key"
        />
        <br />
        <input
          type="text"
          onChange={(e) => handlePromptChange(e)}
          value={prompt}
          className="promptInput"
          placeholder="Enter your prompt"
        />

        <button
          onClick={handleSubmit}
          className="submitButton"
          disabled={loading || key.length < 1}
        >
          {loading ? "Loading" : "Generate"}
        </button>
        <br />

        {/* <button className="submitButton" onClick={handleSecond}>
          Second
        </button> */}
        <div className="buttonContainer">
          <button
            className="submitButton"
            style={{ marginLeft: 5 }}
            onClick={() => dispatch({ type: ACTIONS.CLEAR_GRAPH })}
          >
            Clear
          </button>
          <button
            className="submitButton"
            style={{ marginLeft: 5 }}
            onClick={() => exportData(graphState?.edges)}
            disabled={graphState?.edges?.length < 1}
          >
            Export JSON
          </button>
          <label className="custom-file-upload">
            <input
              type="file"
              accept=".json"
              onChange={handleJSONImport}
              value={file}
            />
            Import JSON
          </label>
          <LayoutSelector option={option} setOptions={setOptions} />
        </div>
      </div>
      <Graph data={graphState} layout={option} />
      <div className="footer">
        <p>Copyrights © {new Date().getFullYear()}</p>
        <a
          href="https://github.com/iAmmarTahir/KnowledgeGraphGPT"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={GithubLogo}
            alt="github"
            width={20}
            height={20}
            className="github"
          />
        </a>
      </div>
    </div>
  );
}

export default App;
