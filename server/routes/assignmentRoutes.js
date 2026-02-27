const express = require("express");
const router = express.Router();
const { getAssignments } = require("../controllers/assignmentController");

router.get("/assignments", getAssignments);

module.exports = router;