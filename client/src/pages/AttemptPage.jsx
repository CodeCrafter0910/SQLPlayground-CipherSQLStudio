import Editor from "@monaco-editor/react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function AttemptPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState(null);
  const [loadingAssignment, setLoadingAssignment] = useState(true);
  const [assignmentError, setAssignmentError] = useState("");

  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [queryError, setQueryError] = useState("");
  const [loadingQuery, setLoadingQuery] = useState(false);

  const [hint, setHint] = useState("");
  const [loadingHint, setLoadingHint] = useState(false);

  const [activeTable, setActiveTable] = useState(0);
  const [savedMsg, setSavedMsg] = useState("");

  // Fetch the real assignment from MongoDB via the backend
  useEffect(() => {
    setLoadingAssignment(true);
    setAssignmentError("");

    fetch(`${import.meta.env.VITE_API_URL}/api/assignments/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Assignment not found");
        return res.json();
      })
      .then((data) => {
        setAssignment(data);
        setLoadingAssignment(false);
      })
      .catch((err) => {
        setAssignmentError(err.message || "Failed to load assignment.");
        setLoadingAssignment(false);
      });
  }, [id]);

  const executeQuery = () => {
    if (!query.trim()) return;
    setLoadingQuery(true);
    setQueryError("");
    setResult(null);

    fetch(`${import.meta.env.VITE_API_URL}/api/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        assignmentId: assignment?._id || null,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setResult(data.rows);
          setQueryError("");
          setSavedMsg("✓ Attempt saved");
          setTimeout(() => setSavedMsg(""), 3000);
        } else {
          setQueryError(data.error);
          setResult(null);
        }
        setLoadingQuery(false);
      })
      .catch((err) => {
        setQueryError(err.message || "Request failed. Is the server running?");
        setLoadingQuery(false);
      });
  };

  const getHint = () => {
    if (!assignment) return;
    setLoadingHint(true);

    fetch(`${import.meta.env.VITE_API_URL}/api/hint`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: assignment.question,
        userQuery: query,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setHint(data.hint);
        setLoadingHint(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingHint(false);
      });
  };

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loadingAssignment) {
    return (
      <div className="attempt-page">
        <div className="attempt-page__loader">
          <div className="loader-spinner" />
          <p>Loading assignment...</p>
        </div>
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (assignmentError) {
    return (
      <div className="attempt-page">
        <div className="attempt-page__error-state">
          <span className="error-state__icon">⚠</span>
          <p>{assignmentError}</p>
          <button className="btn-primary" onClick={() => navigate("/")}>
            ← Back to Assignments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="attempt-page">
      {/* ── Header ── */}
      <div className="attempt-page__header">
        <button className="attempt-page__back" onClick={() => navigate("/")}>
          ←
        </button>
        <div className="attempt-page__header-info">
          <h2 className="attempt-page__title">
            {assignment.title}
          </h2>
          <span className={`badge badge--${assignment.difficulty}`}>
            {assignment.difficulty}
          </span>
        </div>
        {savedMsg && <span className="save-msg">{savedMsg}</span>}
      </div>

      {/* ── Content Grid ── */}
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
            <p className="question-text">{assignment.question}</p>
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
                onChange={(value) => setQuery(value || "")}
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
              <button
                className="btn-primary"
                onClick={executeQuery}
                disabled={loadingQuery}
              >
                {loadingQuery ? "⟳ Running..." : "▶ Execute Query"}
              </button>
              <button
                className="btn-secondary"
                onClick={getHint}
                disabled={loadingHint}
              >
                {loadingHint ? "⟳ Loading..." : "✦ Get Hint"}
              </button>
            </div>

            {queryError && <p className="error">{queryError}</p>}

            {hint && (
              <div className="hint-box">
                <div className="hint-box__label">✦ AI Hint</div>
                <p>{hint}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Sample Data Viewer ── */}
      {assignment.tables && assignment.tables.length > 0 && (
        <div className="sample-data">
          <div className="panel-header">
            <span className="panel-header__label">
              <span className="panel-header__icon">🗄️</span>
              Sample Data &amp; Schema
            </span>
            <span className="panel-header__lang">
              {assignment.tables.length} table{assignment.tables.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Table tabs */}
          {assignment.tables.length > 1 && (
            <div className="sample-data__tabs">
              {assignment.tables.map((tbl, idx) => (
                <button
                  key={idx}
                  className={`sample-data__tab${activeTable === idx ? " sample-data__tab--active" : ""}`}
                  onClick={() => setActiveTable(idx)}
                >
                  {tbl.tableName}
                </button>
              ))}
            </div>
          )}

          <div className="sample-data__body">
            {(() => {
              const tbl = assignment.tables[activeTable];
              return (
                <>
                  {/* Schema columns */}
                  <div className="schema-pill-row">
                    {tbl.columns.map((col, i) => (
                      <span key={i} className="schema-pill">
                        <span className="schema-pill__name">{col.name}</span>
                        <span className="schema-pill__type">{col.type}</span>
                      </span>
                    ))}
                  </div>

                  {/* Sample rows table */}
                  {tbl.sampleRows && tbl.sampleRows.length > 0 && (
                    <div className="results-table-wrap">
                      <table>
                        <thead>
                          <tr>
                            {tbl.columns.map((col) => (
                              <th key={col.name}>{col.name}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {tbl.sampleRows.map((row, ri) => (
                            <tr key={ri}>
                              {tbl.columns.map((col) => (
                                <td key={col.name}>
                                  {row[col.name] !== undefined && row[col.name] !== null
                                    ? String(row[col.name])
                                    : "—"}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* ── Results Panel ── */}
      {result && result.length > 0 && (
        <div className="attempt-page__results">
          <div className="panel-header">
            <span className="panel-header__label">
              <span className="panel-header__icon">📊</span>
              Query Results
            </span>
            <span className="panel-header__lang">
              {result.length} row{result.length !== 1 ? "s" : ""}
            </span>
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
                      <td key={i}>{value !== null ? String(value) : "NULL"}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty result message */}
      {result && result.length === 0 && (
        <div className="attempt-page__results">
          <div className="panel-header">
            <span className="panel-header__label">
              <span className="panel-header__icon">📊</span>
              Query Results
            </span>
          </div>
          <div className="panel-body">
            <p className="empty-result">Query executed successfully — 0 rows returned.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AttemptPage;