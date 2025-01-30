import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
    course: "",
  });

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/assignments/getall"
      );
      setAssignments(response.data.assignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const handleDoAssignment = (id) => {
    // Implement your logic for handling assignment submission
  };

  const handleCreateAssignment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/assignments/",
        newAssignment
      );
      setAssignments((prevAssignments) => [
        ...prevAssignments,
        response.data.assignment,
      ]);
      setNewAssignment({ title: "", description: "", dueDate: "", course: "" }); // Reset form after submission
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="w-3/4 p-4">
        <h1 className="text-2xl font-bold mb-4">Assignments</h1>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Create New Assignment</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateAssignment();
            }}
            className="space-y-4"
          >
            <input
              type="text"
              value={newAssignment.title}
              onChange={(e) =>
                setNewAssignment({ ...newAssignment, title: e.target.value })
              }
              placeholder="Assignment Title"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <textarea
              value={newAssignment.description}
              onChange={(e) =>
                setNewAssignment({
                  ...newAssignment,
                  description: e.target.value,
                })
              }
              placeholder="Assignment Description"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="datetime-local"
              value={newAssignment.dueDate}
              onChange={(e) =>
                setNewAssignment({ ...newAssignment, dueDate: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={newAssignment.course}
              onChange={(e) =>
                setNewAssignment({ ...newAssignment, course: e.target.value })
              }
              placeholder="Course (e.g., CS101)"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
            >
              Create Assignment
            </button>
          </form>
        </div>
        <div>
          {assignments.map((assignment, index) => (
            <div
              key={assignment._id || assignment.id || index} // Ensure unique key
              className="mb-4 p-4 border border-gray-300 rounded shadow-sm"
            >
              <h3 className="text-lg font-semibold">{assignment.title}</h3>
              <p className="text-sm mb-2">{assignment.description}</p>
              <p className="text-sm text-gray-500">
                Due Date: {new Date(assignment.dueDate).toLocaleString()}
              </p>
              {!assignment.done ? (
                <AssignmentForm
                  onDoAssignment={() =>
                    handleDoAssignment(assignment._id || assignment.id)
                  }
                />
              ) : (
                <p className="text-green-500">Assignment Done</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AssignmentForm = ({ onDoAssignment }) => {
  const [opinion, setOpinion] = useState("");

  const handleInputChange = (event) => {
    setOpinion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (opinion.trim() !== "") {
      onDoAssignment();
    } else {
      alert("Please provide your opinion/assignment.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={opinion}
        onChange={handleInputChange}
        placeholder="Enter your opinion/assignment..."
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="mt-2 w-full py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
      >
        Submit
      </button>
    </form>
  );
};

export default StudentAssignments;
