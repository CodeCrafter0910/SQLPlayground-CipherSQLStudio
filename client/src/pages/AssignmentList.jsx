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
      {/* ── Page Header ── */}
      <div className="assignment-list__header">
        <h2 className="assignment-list__title">
          SQL <span>Assignments</span>
        </h2>
        <p className="assignment-list__subtitle">
          Choose a challenge to begin
        </p>
      </div>

      {/* ── Cards Grid ── */}
      <div className="assignment-list__grid">
        {assignments.map((assignment, index) => (
          <div key={assignment.id} className="assignment-card">
            <div className="assignment-card__body">
              <p className="assignment-card__id">Assignment #{index + 1}</p>
              <h3 className="assignment-card__title">{assignment.title}</h3>

              {/* Difficulty badge */}
              <span className={`badge badge--${assignment.difficulty}`}>
                {assignment.difficulty}
              </span>

              <p className="assignment-card__description">
                {assignment.description}
              </p>
            </div>

            <div className="assignment-card__footer">
              <button
                className="btn-primary"
                onClick={() => navigate(`/attempt/${assignment.id}`)}
              >
                Start Challenge →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AssignmentList;