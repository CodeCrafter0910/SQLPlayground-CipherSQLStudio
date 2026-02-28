import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AssignmentList() {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/assignments`)
      .then((res) => res.json())
      .then((data) => setAssignments(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="assignment-list">
      <h2>SQL Assignments</h2>

      {assignments.map((assignment) => (
        <div key={assignment.id} className="assignment-card">
          <h3>{assignment.title}</h3>
          <p className="difficulty">{assignment.difficulty}</p>
          <p>{assignment.description}</p>
          <button onClick={() => navigate(`/attempt/${assignment.id}`)}>
            Start Assignment
          </button>
        </div>
      ))}
    </div>
  );
}

export default AssignmentList;