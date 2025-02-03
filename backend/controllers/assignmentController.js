import { Assignment } from "../models/assignmentSchema.js";

// Add these new controller methods
export const submitAssignment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { studentId, content } = req.body;

    // Check if already submitted
    const assignment = await Assignment.findOne({
      _id: id,
      "submissions.studentId": studentId,
    });

    if (assignment) {
      return res.status(400).json({
        success: false,
        message: "You've already submitted this assignment",
      });
    }

    const updated = await Assignment.findByIdAndUpdate(
      id,
      {
        $push: {
          submissions: {
            studentId,
            content,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Assignment submitted successfully",
      assignment: updated,
    });
  } catch (err) {
    next(err);
  }
};

export const getSubmissions = async (req, res, next) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findById(id).populate(
      "submissions.studentId",
      "name email"
    );

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    res.status(200).json({
      success: true,
      submissions: assignment.submissions,
    });
  } catch (err) {
    next(err);
  }
};

// Modify getAllAssignments to include submission status
export const getAllAssignments = async (req, res, next) => {
  try {
    const { studentId } = req.query;
    let assignments = await Assignment.find().lean();

    if (studentId) {
      assignments = assignments.map((assignment) => ({
        ...assignment,
        submitted: assignment.submissions.some(
          (sub) => sub.studentId.toString() === studentId
        ),
      }));
    }

    res.status(200).json({
      success: true,
      assignments,
    });
  } catch (err) {
    next(err);
  }
};

// Create the assignment
export const createAssignment = async (req, res, next) => {
  try {
    const { title, description, dueDate, course } = req.body;

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
