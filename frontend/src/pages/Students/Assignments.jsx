import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/assignments/getall",
        {
          params: { studentId: localStorage.getItem("studentId") },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      // Ensure assignments is always an array
      setAssignments(response.data?.assignments || []);
    } catch (error) {
      toast.error("Failed to load assignments");
      setAssignments([]); // Fallback to an empty array
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmission = async (assignmentId, submissionContent) => {
    if (!file && !submissionContent.trim()) {
      toast.warning("Please add a file or text submission");
      return;
    }

    const formData = new FormData();
    formData.append("studentId", localStorage.getItem("studentId"));
    formData.append("content", submissionContent);
    if (file) formData.append("submissionFile", file);

    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/assignments/${assignmentId}/submit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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
      setFile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Submission failed");
    }
  };

  if (loading)
    return <p className="text-center py-8">Loading assignments...</p>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <ToastContainer position="top-center" />
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Your Assignments
        </h1>

        <div className="space-y-6">
          {assignments.length > 0 ? (
            assignments.map((assignment) => (
              <AssignmentCard
                key={assignment._id}
                assignment={assignment}
                onSubmission={handleSubmission}
                onFileChange={handleFileChange}
              />
            ))
          ) : (
            <div className="text-gray-500 text-center py-8">
              No assignments found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AssignmentCard = ({ assignment, onSubmission, onFileChange }) => {
  const [submissionContent, setSubmissionContent] = useState("");
  const [file, setFile] = useState(null);
  const isPastDue = new Date(assignment?.dueDate) < new Date();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPastDue) {
      toast.error("This assignment is past due date");
      return;
    }
    onSubmission(assignment._id, submissionContent);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {assignment?.title || "Untitled Assignment"}
          </h3>
          <p className="text-gray-600 mt-2">
            {assignment?.description || "No description available"}
          </p>
          <div className="mt-4 space-y-1 text-sm">
            <p className="text-gray-500">
              Due:{" "}
              {assignment?.dueDate
                ? new Date(assignment.dueDate).toLocaleDateString()
                : "No due date"}
            </p>
            <p className="text-gray-500">
              Course: {assignment?.course?.name || "No course specified"}
            </p>
            <p className="text-gray-500">
              Instructor: {assignment?.instructor?.name || "Unknown instructor"}
            </p>
          </div>
        </div>
        <StatusBadge submitted={assignment?.submitted} pastDue={isPastDue} />
      </div>

      {assignment?.submitted ? (
        <SubmissionDetails submission={assignment?.submissions?.[0]} />
      ) : (
        <SubmissionForm
          onSubmit={handleSubmit}
          content={submissionContent}
          onContentChange={setSubmissionContent}
          onFileChange={(e) => {
            onFileChange(e);
            setFile(e.target.files[0]);
          }}
          file={file}
          disabled={isPastDue}
        />
      )}
    </div>
  );
};

const StatusBadge = ({ submitted, pastDue }) => {
  if (submitted) {
    return (
      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
        Submitted
      </span>
    );
  }
  if (pastDue) {
    return (
      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
        Past Due
      </span>
    );
  }
  return (
    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
      Pending
    </span>
  );
};

const SubmissionDetails = ({ submission }) => (
  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
    <h4 className="font-medium text-gray-700 mb-2">Your Submission</h4>
    {submission?.content && (
      <p className="text-gray-600 mb-4">{submission.content}</p>
    )}
    {submission?.fileUrl && (
      <a
        href={submission.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        Download Submitted File
      </a>
    )}
    <div className="mt-4 text-sm text-gray-500">
      Submitted on:{" "}
      {submission?.submittedAt
        ? new Date(submission.submittedAt).toLocaleString()
        : "Unknown"}
      {submission?.grade && (
        <div className="mt-2">
          <span className="font-medium text-gray-700">Grade:</span>{" "}
          <span className="text-green-600">{submission.grade}/100</span>
        </div>
      )}
    </div>
  </div>
);

const SubmissionForm = ({
  onSubmit,
  content,
  onContentChange,
  onFileChange,
  file,
  disabled,
}) => (
  <form onSubmit={onSubmit} className="mt-4">
    <textarea
      className="w-full p-3 border rounded-md"
      placeholder="Enter submission text..."
      value={content}
      onChange={(e) => onContentChange(e.target.value)}
      disabled={disabled}
    />
    <input
      type="file"
      className="mt-2"
      onChange={onFileChange}
      disabled={disabled}
    />
    <button
      type="submit"
      className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-md"
      disabled={disabled}
    >
      Submit
    </button>
  </form>
);

export default StudentAssignments;
