const Attempt = require("../models/Attempt");

// POST /api/attempts — save a query attempt
const saveAttempt = async (req, res) => {
    try {
        const { assignmentId, query, success, rowCount, errorMessage } = req.body;

        if (!assignmentId || !query) {
            return res.status(400).json({ error: "assignmentId and query are required" });
        }

        const attempt = await Attempt.create({
            assignmentId,
            query,
            success: success || false,
            rowCount: rowCount || 0,
            errorMessage: errorMessage || null,
        });

        res.status(201).json({ success: true, attempt });
    } catch (err) {
        console.error("Failed to save attempt:", err.message);
        res.status(500).json({ error: "Failed to save attempt" });
    }
};

// GET /api/attempts/:assignmentId — get all attempts for an assignment
const getAttemptsByAssignment = async (req, res) => {
    try {
        const attempts = await Attempt.find({
            assignmentId: req.params.assignmentId,
        }).sort({ createdAt: -1 });

        res.json(attempts);
    } catch (err) {
        console.error("Failed to fetch attempts:", err.message);
        res.status(500).json({ error: "Failed to load attempts" });
    }
};

module.exports = { saveAttempt, getAttemptsByAssignment };
