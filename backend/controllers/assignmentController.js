import { Assignment } from "../models/assignmentSchema.js";

// Create a new assignment
export const createAssignment = async (req, res, next) => {
  const { title, description, dueDate, course } = req.body;

  try {
    // Validate required fields
    if (!title || !description || !dueDate || !course) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, description, due date, and course!",
      });
    }

    // Create the assignment
    const assignment = await Assignment.create({
      title,
      description,
      dueDate,
      course,
    });

    res.status(201).json({
      success: true,
      message: "Assignment created successfully!",
      assignment,
    });
  } catch (err) {
    next(err);
  }
};

// Get all assignments
export const getAllAssignments = async (req, res, next) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json({
      success: true,
      assignments,
    });
  } catch (err) {
    next(err);
  }
};

// Get a single assignment by ID
export const getAssignmentById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found!",
      });
    }

    res.status(200).json({
      success: true,
      assignment,
    });
  } catch (err) {
    next(err);
  }
};

// Update an assignment
export const updateAssignment = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, dueDate, course } = req.body;

  try {
    const assignment = await Assignment.findByIdAndUpdate(
      id,
      { title, description, dueDate, course },
      { new: true, runValidators: true }
    );

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Assignment updated successfully!",
      assignment,
    });
  } catch (err) {
    next(err);
  }
};

// Delete an assignment
export const deleteAssignment = async (req, res, next) => {
  const { id } = req.params;

  try {
    const assignment = await Assignment.findByIdAndDelete(id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Assignment deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};
