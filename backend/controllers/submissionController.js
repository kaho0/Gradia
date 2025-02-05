import Submission from "../models/submissionSchema.js";
import Assignment from "../models/assignmentSchema.js";

// 📌 Submit an Assignment
export const submitAssignment = async (req, res) => {
  try {
    const { studentId, assignmentId, fileUrl } = req.body;

    if (!studentId || !assignmentId || !fileUrl) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Ensure the assignment exists
    const assignmentExists = await Assignment.findById(assignmentId);
    if (!assignmentExists) {
      return res
        .status(404)
        .json({ success: false, message: "Assignment not found" });
    }

    // Create the submission (✅ No duplicate)
    const newSubmission = new Submission({
      assignmentId,
      studentId,
      fileUrl,
    });

    await newSubmission.save();

    // Link the submission to the assignment
    await Assignment.findByIdAndUpdate(assignmentId, {
      $push: { submissions: newSubmission._id },
    });

    res.status(201).json({ success: true, submission: newSubmission });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error submitting assignment", error });
  }
};

// 📌 Get Submissions by Assignment
export const getSubmissionsByAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    if (!assignmentId) {
      return res
        .status(400)
        .json({ success: false, message: "Assignment ID is required" });
    }

    const submissions = await Submission.find({ assignmentId }).populate(
      "studentId",
      "name email"
    );

    res.status(200).json({ success: true, submissions });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching submissions",
      error,
    });
  }
};

// 📌 Grade a Specific Submission
export const gradeSubmission = async (req, res) => {
  try {
    const { id } = req.params; // Submission ID from URL
    const { grade } = req.body; // Grade from the request body

    if (!grade) {
      return res
        .status(400)
        .json({ success: false, message: "Grade is required" });
    }

    // Ensure the submission exists
    const submission = await Submission.findById(id);
    if (!submission) {
      return res
        .status(404)
        .json({ success: false, message: "Submission not found" });
    }

    // Update the submission with the grade
    submission.grade = grade; // Set the grade in the submission
    await submission.save(); // Save the updated submission

    res.status(200).json({ success: true, submission });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error grading submission", error });
  }
};
