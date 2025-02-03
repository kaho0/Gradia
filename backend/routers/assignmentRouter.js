import express from "express";
import {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
  getSubmissions,
} from "../controllers/assignmentController.js";

const router = express.Router();

router.get("/getall", getAllAssignments);
router.post("/", createAssignment);
router.get("/:id", getAssignmentById);
router.put("/:id", updateAssignment);
router.delete("/:id", deleteAssignment);

// New submission routes
router.post("/:id/submit", submitAssignment);
router.get("/:id/submissions", getSubmissions);

export default router;
