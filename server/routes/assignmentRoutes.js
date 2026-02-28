const express = require("express");
const router = express.Router();
const {
    getAssignments,
    getAssignmentById,
} = require("../controllers/assignmentController");

router.get("/assignments", getAssignments);
router.get("/assignments/:id", getAssignmentById);

module.exports = router;