const pool = require("../config/postgres");

const executeQuery = async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  // 🔒 Allow only SELECT queries
  const trimmedQuery = query.trim().toLowerCase();

  if (!trimmedQuery.startsWith("select")) {
    return res.status(400).json({
      success: false,
      error: "Only SELECT queries are allowed",
    });
  }

  try {
    const result = await pool.query(query);

    res.json({
      success: true,
      rows: result.rows,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { executeQuery };