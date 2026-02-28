const express = require("express");
const router = express.Router();
const { saveAttempt, getAttemptsByAssignment } = require("../controllers/attemptController");

router.post("/attempts", saveAttempt);
router.get("/attempts/:assignmentId", getAttemptsByAssignment);

module.exports = router;
