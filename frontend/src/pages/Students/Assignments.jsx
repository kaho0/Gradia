import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const studentId = "your-student-id"; // Replace with the actual student ID

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/assignments/getall",
        {
          params: {
            studentId: studentId, // Send student ID to get submission status
          },
        }
      );
      setAssignments(response.data.assignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      toast.error("Failed to load assignments");
    }
  };

  const handleDoAssignment = async (assignmentId, submissionContent) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/assignments/${assignmentId}/submit`,
        {
          studentId: studentId,
          content: submissionContent,
        }
      );

      setAssignments((prev) =>
        prev.map((assignment) =>
          assignment._id === assignmentId
            ? {
                ...assignment,
                submitted: true,
                submissions: response.data.assignment.submissions,
              }
            : assignment
        )
      );
      toast.success("Assignment submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div className="flex">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="w-3/4 p-4">
        <h1 className="text-2xl font-bold mb-4">Assignments</h1>
        <div>
          {assignments.map((assignment) => (
            <div
              key={assignment._id}
              className="mb-4 p-4 border border-gray-300 rounded shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{assignment.title}</h3>
                  <p className="text-sm mb-2 text-gray-600">
                    {assignment.description}
                  </p>
                  <div className="text-sm space-y-1">
                    <p className="text-gray-500">
                      Due: {new Date(assignment.dueDate).toLocaleString()}
                    </p>
                    <p className="text-gray-500">Course: {assignment.course}</p>
                  </div>
                </div>
                {assignment.submitted ? (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Submitted
                  </span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                    Pending
                  </span>
                )}
              </div>

              {assignment.submitted ? (
                <div className="mt-4 p-3 bg-gray-50 rounded">
                  <h4 className="font-medium mb-2">Your Submission:</h4>
                  <p className="text-sm text-gray-600">
                    {assignment.submissions[0]?.content}
                  </p>
                  <div className="mt-2 text-sm">
                    <span className="text-gray-500">
                      Submitted on:{" "}
                      {new Date(
                        assignment.submissions[0]?.submittedAt
                      ).toLocaleDateString()}
                    </span>
                    {assignment.submissions[0]?.grade && (
                      <div className="mt-1 text-blue-600">
                        Grade: {assignment.submissions[0]?.grade}/100
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <AssignmentForm
                  onSubmit={(content) =>
                    handleDoAssignment(assignment._id, content)
                  }
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AssignmentForm = ({ onSubmit }) => {
  const [submissionContent, setSubmissionContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submissionContent.trim()) {
      onSubmit(submissionContent);
      setSubmissionContent("");
    } else {
      toast.warning("Please write your submission before sending!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={submissionContent}
        onChange={(e) => setSubmissionContent(e.target.value)}
        placeholder="Write your assignment submission here..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows="5"
      />
      <button
        type="submit"
        className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Submit Assignment
      </button>
    </form>
  );
};

export default StudentAssignments;
