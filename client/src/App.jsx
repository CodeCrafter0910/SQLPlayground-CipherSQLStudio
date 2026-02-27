import { Routes, Route } from "react-router-dom";
import AssignmentList from "./pages/AssignmentList";
import AttemptPage from "./pages/AttemptPage";

function App() {
  return (
    <div>
      <h1>CipherSQLStudio</h1>

      <Routes>
        <Route path="/" element={<AssignmentList />} />
        <Route path="/attempt/:id" element={<AttemptPage />} />
      </Routes>
    </div>
  );
}

export default App;