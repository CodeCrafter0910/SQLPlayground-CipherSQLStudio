import Editor from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import { useState } from "react";

function AttemptPage() {
  const { id } = useParams();

  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [hint, setHint] = useState("");
  const [loadingHint, setLoadingHint] = useState(false);

  const executeQuery = () => {
    fetch("http://localhost:5000/api/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setResult(data.rows);
          setError("");
        } else {
          setError(data.error);
          setResult(null);
        }
      })
      .catch((err) => console.error(err));
  };

  const getHint = () => {
    setLoadingHint(true);

    fetch("http://localhost:5000/api/hint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: "Write a SQL query to solve this assignment.",
        userQuery: query,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setHint(data.hint);
        }
        setLoadingHint(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingHint(false);
      });
  };

  return (
    <div className="attempt-page">
      <div className="attempt-page__header">
        <h2>Assignment ID: {id}</h2>
      </div>

      <div className="attempt-page__content">
        <div className="attempt-page__question">
          <h3>Question</h3>
          <p>Write a SQL query to solve this assignment.</p>
        </div>

        <div className="attempt-page__editor">
          <h3>SQL Editor</h3>

          <Editor
            height="200px"
            language="sql"
            theme="vs-light"
            value={query}
            onChange={(value) => setQuery(value)}
          />

          <div style={{ marginTop: "10px" }}>
            <button onClick={executeQuery}>Execute Query</button>
            <button
              onClick={getHint}
              style={{ marginLeft: "10px" }}
            >
              {loadingHint ? "Loading..." : "Get Hint"}
            </button>
          </div>

          {error && <p className="error">{error}</p>}

          {hint && (
            <div className="hint-box">
              <h4>Hint:</h4>
              <p>{hint}</p>
            </div>
          )}
        </div>
      </div>

      {result && result.length > 0 && (
        <div className="attempt-page__results">
          <h3>Results</h3>

          <table>
            <thead>
              <tr>
                {Object.keys(result[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AttemptPage;