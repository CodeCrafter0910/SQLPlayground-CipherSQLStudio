import { Routes, Route } from "react-router-dom";
import AssignmentList from "./pages/AssignmentList";
import AttemptPage from "./pages/AttemptPage";

function App() {
  return (
    <div id="app">
      {/* ── Navbar ── */}
      <header className="navbar">
        <a className="navbar__logo" href="/">
          <div className="navbar__icon">⌘</div>
          <div>
            <div className="navbar__wordmark">
              Cipher<span>SQL</span>Studio
            </div>
            <div className="navbar__tagline">Master SQL, one query at a time</div>
          </div>
        </a>

        <div className="navbar__badge">
          <span className="dot" />
          SQL Engine Live
        </div>
      </header>

      {/* ── Page Content ── */}
      <main className="page-wrapper">
        <Routes>
          <Route path="/" element={<AssignmentList />} />
          <Route path="/attempt/:id" element={<AttemptPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;