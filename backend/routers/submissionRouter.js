import express from "express";
import {
  gradeSubmission,
  getSubmissionsByAssignment,
  submitAssignment, // ✅ Import the submission function
} from "../controllers/submissionController.js";

const router = express.Router();

// ✅ Submit an assignment
router.post("/:assignmentId/submit", submitAssignment);

// ✅ Get all submissions for a specific assignment
router.get("/assignment/:assignmentId", getSubmissionsByAssignment);

// ✅ Grade a specific submission
router.post("/:id/grade", gradeSubmission);

export default router;
