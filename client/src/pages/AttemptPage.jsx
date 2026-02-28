import Editor from "@monaco-editor/react";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function AttemptPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [hint, setHint] = useState("");
  const [loadingHint, setLoadingHint] = useState(false);

  const executeQuery = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/execute`, {
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

    fetch(`${import.meta.env.VITE_API_URL}/api/hint`, {
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
      {/* ── Header ── */}
      <div className="attempt-page__header">
        <button className="attempt-page__back" onClick={() => navigate("/")}>
          ←
        </button>
        <h2 className="attempt-page__title">
          Assignment <span>#{id}</span>
        </h2>
      </div>

      {/* ── Content ── */}
      <div className="attempt-page__content">
        {/* Question Panel */}
        <div className="attempt-page__question">
          <div className="panel-header">
            <span className="panel-header__label">
              <span className="panel-header__icon">💡</span>
              Problem Statement
            </span>
          </div>
          <div className="panel-body">
            <p className="question-text">
              Write a SQL query to solve this assignment.
            </p>
          </div>
        </div>

        {/* Editor Panel */}
        <div className="attempt-page__editor">
          <div className="panel-header">
            <span className="panel-header__label">
              <span className="panel-header__icon">⌨️</span>
              SQL Editor
            </span>
            <span className="panel-header__lang">SQL</span>
          </div>
          <div className="panel-body">
            <div className="editor-monaco-wrap">
              <Editor
                height="220px"
                language="sql"
                theme="vs-dark"
                value={query}
                onChange={(value) => setQuery(value)}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  fontFamily: "'Fira Code', monospace",
                  fontLigatures: true,
                  padding: { top: 12, bottom: 12 },
                }}
              />
            </div>

            <div className="editor-actions">
              <button className="btn-primary" onClick={executeQuery}>
                ▶ Execute Query
              </button>
              <button className="btn-secondary" onClick={getHint}>
                {loadingHint ? "⟳ Loading..." : "✦ Get Hint"}
              </button>
            </div>

            {error && <p className="error">{error}</p>}

            {hint && (
              <div className="hint-box">
                <div className="hint-box__label">
                  ✦ AI Hint
                </div>
                <p>{hint}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      {result && result.length > 0 && (
        <div className="attempt-page__results">
          <div className="panel-header">
            <span className="panel-header__label">
              <span className="panel-header__icon">📊</span>
              Query Results
            </span>
            <span className="panel-header__lang">{result.length} row{result.length !== 1 ? "s" : ""}</span>
          </div>
          <div className="results-table-wrap">
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
        </div>
      )}
    </div>
  );
}

export default AttemptPage;