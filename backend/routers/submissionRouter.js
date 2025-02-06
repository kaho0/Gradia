import express from "express";
import {
  gradeSubmission,
  getSubmissionsByAssignment,
  submitAssignment,
  getAllSubmissions, // ✅ Import the submission function
} from "../controllers/submissionController.js";

const router = express.Router();

// ✅ Submit an assignment
router.post("/assignments/:assignmentId/submit", submitAssignment);

// ✅ Get all submissions for a specific assignment
router.get("/assignment/:assignmentId", getSubmissionsByAssignment);
router.get("/getall", getAllSubmissions);
// ✅ Grade a specific submission
router.post("/:id/grade", gradeSubmission);

export default router;
