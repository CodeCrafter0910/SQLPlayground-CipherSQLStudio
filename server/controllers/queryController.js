const pool = require("../config/postgres");

const executeQuery = async (req, res) => {
  const { query, assignmentId } = req.body;

  if (!query) {
    return res.status(400).json({ success: false, error: "Query is required" });
  }

  // Allow only SELECT queries for security
  const trimmedQuery = query.trim().toLowerCase();

  if (!trimmedQuery.startsWith("select")) {
    return res.status(400).json({
      success: false,
      error: "Only SELECT queries are allowed for security reasons.",
    });
  }

  try {
    const result = await pool.query(query);

    // If an assignmentId is provided, save the attempt to MongoDB
    if (assignmentId) {
      try {
        const Attempt = require("../models/Attempt");
        await Attempt.create({
          assignmentId,
          query,
          success: true,
          rowCount: result.rows.length,
          errorMessage: null,
        });
      } catch (attemptErr) {
        // Non-blocking — don't fail the query response
        console.error("Could not save attempt:", attemptErr.message);
      }
    }

    res.json({
      success: true,
      rows: result.rows,
      rowCount: result.rows.length,
    });
  } catch (error) {
    // Save failed attempt if assignmentId is present
    if (assignmentId) {
      try {
        const Attempt = require("../models/Attempt");
        await Attempt.create({
          assignmentId,
          query,
          success: false,
          rowCount: 0,
          errorMessage: error.message,
        });
      } catch (attemptErr) {
        console.error("Could not save failed attempt:", attemptErr.message);
      }
    }

    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { executeQuery };