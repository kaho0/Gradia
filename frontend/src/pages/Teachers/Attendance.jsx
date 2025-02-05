import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const CheckAttendanceSection = () => {
  const [students, setStudents] = useState([]);
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

      // Fetch students separately
      const studentsResponse = await axios.get(
        "http://localhost:4000/api/v1/students/getall"
      );
      const fetchedStudents = studentsResponse.data.students;

      setStudents(fetchedStudents);
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
            {students.length > 0 ? (
              students.map((student, index) => {
                const attendanceRecord = attendanceData.find(
                  (record) => record.student === student._id // Matching by correct field
                );

                return (
                  <div
                    key={student._id || index} // Ensuring a unique key
                    className="flex items-center justify-between p-4 border-b"
                  >
                    <span className="text-lg font-medium">{student.name}</span>
                    <div className="flex space-x-4">
                      <span
                        className={`px-4 py-2 rounded-md ${
                          attendanceRecord?.status === "Present"
                            ? "bg-green-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        Present
                      </span>
                      <span
                        className={`px-4 py-2 rounded-md ${
                          attendanceRecord?.status === "Absent"
                            ? "bg-red-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        Absent
                      </span>
                      <span
                        className={`px-4 py-2 rounded-md ${
                          attendanceRecord?.status === "Absent with apology"
                            ? "bg-yellow-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        Absent with apology
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No students found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckAttendanceSection;
