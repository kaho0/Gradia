import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaPaperPlane } from "react-icons/fa";
import Sidebar from "./Sidebar";

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newSubmission, setNewSubmission] = useState({
    assignmentId: "",
    student: "",
    content: "",
  });
  const [file, setFile] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [allSubmissions, setAllSubmissions] = useState([]); // New state

  useEffect(() => {
    fetchAssignments();
    fetchAllSubmissions(); // Fetch all submissions when the component mounts
  }, []);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/assignments/getall"
      );
      setAssignments(response.data.assignments || []);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      Swal.fire("Error!", "Failed to load assignments.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Fetch submissions for the selected assignment
  const fetchSubmissions = async (assignmentId) => {
    if (!assignmentId) return;
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/assignment/${assignmentId}`
      );
      setSubmissions(response.data.submissions || []);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  // New: Fetch all submissions regardless of the assignment
  const fetchAllSubmissions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/submissions/getall"
      );
      setAllSubmissions(response.data.submissions || []);
    } catch (error) {
      console.error("Error fetching all submissions:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();

    if (!newSubmission.assignmentId) {
      Swal.fire("Error!", "Please select an assignment.", "error");
      return;
    }
    if (!newSubmission.student.trim()) {
      Swal.fire("Error!", "Please enter your name.", "error");
      return;
    }
    if (!newSubmission.content.trim() && !file) {
      Swal.fire(
        "Error!",
        "Please enter submission text or attach a file.",
        "error"
      );
      return;
    }

    const result = await Swal.fire({
      title: "Submit Assignment?",
      text: "Are you sure you want to submit this assignment?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6d28d9",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!",
    });

    if (result.isConfirmed) {
      try {
        const formData = new FormData();
        formData.append("student", newSubmission.student);
        formData.append("content", newSubmission.content);
        if (file) formData.append("submissionFile", file);

        await axios.post(
          `http://localhost:4000/api/v1/assignments/${newSubmission.assignmentId}/submit`,
          formData,
          {
            headers: {
              // When sending FormData, you usually do not need to set the Content-Type header manually.
              // Let the browser set it (including boundary) automatically.
              // "Content-Type": "multipart/form-data",
            },
          }
        );

        Swal.fire("Success!", "Assignment submitted successfully.", "success");
        // Clear form fields
        setNewSubmission({ assignmentId: "", student: "", content: "" });
        setFile(null);
        fetchSubmissions(newSubmission.assignmentId);
        fetchAllSubmissions(); // Refresh all submissions
      } catch (error) {
        console.error("Error submitting assignment:", error);
        Swal.fire("Error!", "Submission failed. Please try again.", "error");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-poppins">
      <div className="w-1/4 bg-white shadow-lg">
        <Sidebar />
      </div>

      <div className="w-3/4 p-8">
        <h1 className="text-3xl font-semibold text-purple-600 mb-8">
          Student Assignments
        </h1>

        {/* Assignment Submission Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-purple-600 mb-4">
            Submit Assignment
          </h2>
          <form onSubmit={handleAssignmentSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={newSubmission.assignmentId}
                onChange={(e) => {
                  const assignmentId = e.target.value;
                  setNewSubmission({
                    ...newSubmission,
                    assignmentId,
                  });
                  fetchSubmissions(assignmentId);
                }}
                className="w-full p-3 border rounded-lg"
                required
              >
                <option value="">Select Assignment</option>
                {assignments.map((assignment) => (
                  <option key={assignment._id} value={assignment._id}>
                    {assignment.title}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Your Name"
                value={newSubmission.student}
                onChange={(e) =>
                  setNewSubmission({
                    ...newSubmission,
                    student: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-lg"
                required
              />

              <textarea
                placeholder="Enter your submission text..."
                value={newSubmission.content}
                onChange={(e) =>
                  setNewSubmission({
                    ...newSubmission,
                    content: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-lg"
                rows="3"
              />

              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
            >
              <FaPaperPlane className="inline-block mr-2" /> Submit Assignment
            </button>
          </form>
        </div>

        {/* Display submissions for the selected assignment */}
        <h2 className="text-2xl font-semibold text-purple-600 mb-6">
          Your Submissions for Selected Assignment
        </h2>
        {submissions.length > 0 ? (
          <div className="space-y-4 mb-8">
            {submissions.map((submission) => (
              <div
                key={submission._id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <p>
                  <strong>Student:</strong> {submission.student}
                </p>
                <p>
                  <strong>Content:</strong>{" "}
                  {submission.content || "No text submitted"}
                </p>
                {submission.fileUrl && (
                  <p>
                    <strong>File:</strong>{" "}
                    <a
                      href={submission.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      View File
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No submissions found for the selected assignment.</p>
        )}

        {/* Display all submissions */}
        <h2 className="text-2xl font-semibold text-purple-600 mb-6">
          All Submissions
        </h2>
        {allSubmissions.length > 0 ? (
          <div className="space-y-4">
            {allSubmissions.map((submission) => (
              <div
                key={submission._id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <p>
                  <strong>Student:</strong> {submission.student}
                </p>
                <p>
                  <strong>Content:</strong>{" "}
                  {submission.content || "No text submitted"}
                </p>
                {submission.fileUrl && (
                  <p>
                    <strong>File:</strong>{" "}
                    <a
                      href={submission.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      View File
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No submissions found.</p>
        )}
      </div>
    </div>
  );
};

export default StudentAssignments;
