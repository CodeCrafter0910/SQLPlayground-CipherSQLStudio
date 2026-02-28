const Assignment = require("../models/Assignment");

// GET /api/assignments — list all assignments
const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find(
      {},
      "title description difficulty createdAt"
    ).sort({ createdAt: 1 });

    res.json(assignments);
  } catch (err) {
    console.error("Failed to fetch assignments:", err.message);
    res.status(500).json({ error: "Failed to load assignments" });
  }
};

// GET /api/assignments/:id — single assignment with full schema + sample data
const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    res.json(assignment);
  } catch (err) {
    console.error("Failed to fetch assignment:", err.message);
    res.status(500).json({ error: "Failed to load assignment" });
  }
};

module.exports = { getAssignments, getAssignmentById };