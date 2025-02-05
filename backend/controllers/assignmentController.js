// controllers/assignmentController.js
import Assignment from "../models/assignmentSchema.js";

import Submission from "../models/submissionSchema.js"; // ✅ Ensure you use default import

// Create a new assignment (teacher action)
export const createAssignment = async (req, res) => {
  try {
    const { title, description, dueDate, course, teacherId } = req.body;
    const assignment = await Assignment.create({
      title,
      description,
      dueDate,
      course,
      teacherId,
    });
    res.status(201).json({ assignment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get assignments; can be filtered by teacherId or other query params if needed
export const getAssignments = async (req, res) => {
  try {
    const filter = {};
    if (req.query.teacherId) filter.teacherId = req.query.teacherId;
    // For students, you might later add filtering to return only active assignments.
    const assignments = await Assignment.find(filter);
    res.json({ assignments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single assignment by ID
export const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });
    res.json({ assignment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit an assignment (student action)
// Note: For file handling, ensure you have a middleware (e.g., Multer) to populate req.file.
export const submitAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.id;
    const { studentId, content } = req.body;
    let fileUrl;
    if (req.file) {
      // Adjust the fileUrl based on your file storage strategy.
      fileUrl = req.file.path;
    }
    const submission = await Submission.create({
      assignmentId,
      studentId,
      content,
      fileUrl,
      submittedAt: new Date(),
    });
    res.status(201).json({ submission });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
