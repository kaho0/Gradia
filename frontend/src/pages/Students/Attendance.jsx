import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaSearch,
  FaFilter,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaPlus,
} from "react-icons/fa";
import Sidebar from "./Sidebar";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StudentAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [chartData, setChartData] = useState(null);
  const [newAttendance, setNewAttendance] = useState({
    date: "",
    course: "",
    status: "Present",
  });

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  const fetchAttendanceRecords = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/attendance/student"
      );
      const records = response.data.attendance || [];
      setAttendanceRecords(records);
      generateChartData(records);
    } catch (error) {
      setAttendanceRecords([]);
    }
  };

  const handleMarkAttendance = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/v1/attendance/mark",
        newAttendance
      );
      fetchAttendanceRecords();
      setNewAttendance({ date: "", course: "", status: "Present" });
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  const generateChartData = (records) => {
    const dates = records.map((record) => record.date);
    const statusCounts = {
      Present: records.filter((record) => record.status === "Present").length,
      Absent: records.filter((record) => record.status === "Absent").length,
      "Absent with Apology": records.filter(
        (record) => record.status === "Absent with Apology"
      ).length,
    };

    setChartData({
      labels: dates,
      datasets: [
        {
          label: "Attendance Overview",
          data: [
            statusCounts.Present,
            statusCounts.Absent,
            statusCounts["Absent with Apology"],
          ],
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.1,
        },
      ],
    });
  };

  return (
    <div className="flex">
      <div className="w-1/4 text-white min-h-screen">
        <Sidebar />
      </div>
      <div className="w-3/4 p-6 bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100">
        <h1 className="text-3xl font-semibold text-blue-700 mb-6">
          My Attendance
        </h1>
        <div className="mb-6 p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Mark Attendance</h2>
          <div className="flex space-x-4">
            <input
              type="date"
              value={newAttendance.date}
              onChange={(e) =>
                setNewAttendance({ ...newAttendance, date: e.target.value })
              }
              className="border p-2 rounded w-1/3"
            />
            <input
              type="text"
              placeholder="Course"
              value={newAttendance.course}
              onChange={(e) =>
                setNewAttendance({ ...newAttendance, course: e.target.value })
              }
              className="border p-2 rounded w-1/3"
            />
            <select
              value={newAttendance.status}
              onChange={(e) =>
                setNewAttendance({ ...newAttendance, status: e.target.value })
              }
              className="border p-2 rounded w-1/3"
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Absent with Apology">Absent with Apology</option>
            </select>
            <button
              onClick={handleMarkAttendance}
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
            >
              <FaPlus className="mr-2" /> Submit
            </button>
          </div>
        </div>
        <div className="mb-8">{chartData && <Line data={chartData} />}</div>
      </div>
    </div>
  );
};

export default StudentAttendance;
