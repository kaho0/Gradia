// routes/assignmentRouter.js
import express from "express";
import {
  createAssignment,
  getAssignments,
  getAssignmentById,
  submitAssignment,
} from "../controllers/assignmentController.js";

// You might use a middleware (e.g., Multer) for file uploads when handling submissions.
import multer from "multer";
const upload = multer({ dest: "uploads/" }); // adjust configuration as needed

const router = express.Router();

router.post("/create", createAssignment);
router.get("/getall", getAssignments);
router.get("/:id", getAssignmentById);
// Use upload.single('submissionFile') if expecting a file with key 'submissionFile'
router.post("/:id/submit", upload.single("submissionFile"), submitAssignment);

export default router;
