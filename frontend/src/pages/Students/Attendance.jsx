import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaPlus,
  FaUser,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";

const StudentAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newAttendance, setNewAttendance] = useState({
    date: "",
    course: "",
    month: "",
    status: "Present",
    student: "",
  });

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  const fetchAttendanceRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/attendance/getall"
      );
      setAttendanceRecords(response.data.data || []);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAttendance = async (e) => {
    e.preventDefault();
    const result = await Swal.fire({
      title: "Mark Attendance?",
      text: "Are you sure you want to submit this attendance record?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6d28d9",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.post("http://localhost:4000/api/v1/attendance", {
          attendanceData: [newAttendance],
        });

        fetchAttendanceRecords();
        setNewAttendance({
          date: "",
          course: "",
          month: "",
          status: "Present",
          student: "",
        });

        Swal.fire({
          title: "Success!",
          text: "Attendance marked successfully.",
          icon: "success",
          confirmButtonColor: "#6d28d9",
        });
      } catch (error) {
        console.error("Error marking attendance:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to mark attendance. Please try again.",
          icon: "error",
          confirmButtonColor: "#6d28d9",
        });
      }
    }
  };

  const renderStatusIcon = (status) => {
    switch (status) {
      case "Present":
        return <FaCheckCircle className="text-green-500" />;
      case "Absent":
        return <FaTimesCircle className="text-red-500" />;
      case "Absent with apology":
        return <FaExclamationCircle className="text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-poppins">
      <div className="w-1/4 bg-white shadow-lg">
        <Sidebar />
      </div>

      <div className="w-3/4 p-8">
        <h1 className="text-3xl font-semibold text-purple-600 mb-8">
          Student Attendance
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-purple-600 mb-4">
            Mark Attendance
          </h2>
          <form onSubmit={handleMarkAttendance} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                value={newAttendance.date}
                onChange={(e) =>
                  setNewAttendance({ ...newAttendance, date: e.target.value })
                }
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Course"
                value={newAttendance.course}
                onChange={(e) =>
                  setNewAttendance({ ...newAttendance, course: e.target.value })
                }
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Month"
                value={newAttendance.month}
                onChange={(e) =>
                  setNewAttendance({ ...newAttendance, month: e.target.value })
                }
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Student Name"
                value={newAttendance.student}
                onChange={(e) =>
                  setNewAttendance({
                    ...newAttendance,
                    student: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-lg"
                required
              />
              <select
                value={newAttendance.status}
                onChange={(e) =>
                  setNewAttendance({ ...newAttendance, status: e.target.value })
                }
                className="w-full p-3 border rounded-lg"
                required
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Absent with apology">Absent with apology</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
            >
              <FaPlus className="inline-block mr-2" /> Submit Attendance
            </button>
          </form>
        </div>

        <h2 className="text-2xl font-semibold text-purple-600 mb-6">
          Attendance Records
        </h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-6">
            {attendanceRecords.map((record) => (
              <div
                key={record._id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold text-purple-600">
                  {record.course}
                </h3>
                <p className="text-gray-600 flex items-center mt-1">
                  <FaUser className="mr-2" /> {record.student}
                </p>
                <div className="flex items-center space-x-2">
                  {renderStatusIcon(record.status)}
                  <span className="text-gray-700">{record.status}</span>
                </div>
                <p className="text-gray-600 flex items-center mt-2">
                  <FaCalendarAlt className="mr-2" /> {record.date} at{" "}
                  {new Date(record.date).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAttendance;
