import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const AttendanceSection = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  const fetchAttendanceRecords = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/attendance/getall"
      );
      setAttendanceRecords(response.data.attendance);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    }
  };

  const handleMarkAttendance = async (id, status) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/attendance/mark/${id}`,
        {
          status, // Send selected attendance status
        }
      );
      if (response.data.success) {
        setAttendanceRecords((prevRecords) =>
          prevRecords.map((record) =>
            record._id === id ? { ...record, status } : record
          )
        );
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  return (
    <div>
      <Sidebar />
      <h1>Attendance</h1>
      <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Student Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record, index) => (
            <tr key={record._id}>
              <td>{index + 1}</td>
              <td>{record.student.name}</td>
              <td>{record.status}</td>
              <td>
                <MarkAttendanceForm
                  onMarkAttendance={(status) =>
                    handleMarkAttendance(record._id, status)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const MarkAttendanceForm = ({ onMarkAttendance }) => {
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedStatus) {
      onMarkAttendance(selectedStatus);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        onChange={(e) => setSelectedStatus(e.target.value)}
        value={selectedStatus}
      >
        <option value="">Select Status</option>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
        <option value="Absent with apology">Absent with Apology</option>
      </select>
      <button type="submit">Mark</button>
    </form>
  );
};

export default AttendanceSection;
