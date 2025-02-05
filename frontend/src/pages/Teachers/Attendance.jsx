import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const CheckAttendanceSection = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      // Fetch attendance data
      const attendanceResponse = await axios.get(
        "http://localhost:4000/api/v1/attendance/getall"
      );
      const fetchedAttendanceData = attendanceResponse.data.data;

      setAttendanceData(fetchedAttendanceData);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-poppins">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-3xl font-semibold text-blue-500 mb-6">
            Attendance
          </h2>

          {/* Attendance List */}
          <div>
            {attendanceData.length > 0 ? (
              attendanceData.map((record, index) => (
                <div
                  key={record._id || index} // Unique key for each record
                  className="flex items-center justify-between p-4 border-b"
                >
                  <span className="text-lg font-medium">
                    {/* Displaying student name */}
                    {record.student || "No name available"}
                  </span>
                  <div className="flex space-x-4">
                    <span
                      className={`px-4 py-2 rounded-md ${
                        record.status === "Present"
                          ? "bg-green-500 text-white" // Green for Present
                          : record.status === "Absent"
                          ? "bg-red-500 text-white" // Red for Absent
                          : record.status === "Absent with apology"
                          ? "bg-yellow-300 text-black" // Yellow for Absent with apology
                          : "bg-gray-200 text-black" // Default color for any other status
                      }`}
                    >
                      {record.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>No attendance records found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckAttendanceSection;
