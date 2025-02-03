import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import Sidebar from "./Sidebar";

Chart.register(...registerables);

const ExamSection = () => {
  const chartRef = useRef(null);
  const [exams, setExams] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("grade");

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/exams/getall"
      );
      setExams(Array.isArray(response.data?.data) ? response.data.data : []);
    } catch (error) {
      console.error("Error fetching exams:", error);
      setExams([]);
    }
  };

  const sortData = (column) => {
    const sortedExams = [...exams].sort((a, b) =>
      sortOrder === "asc"
        ? a[column] > b[column]
          ? 1
          : -1
        : a[column] < b[column]
        ? 1
        : -1
    );
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortColumn(column);
    setExams(sortedExams);
  };

  const subjectMap = {
    Physics: "Physics (Phys)",
    Psychology: "Psychology (Psy)",
    Biology: "Biology (Bio)",
    "Computer Science": "Computer Science (CS)",
    Geography: "Geography (Geo)",
    Mathematics: "Mathematics (Math)",
    Economics: "Economics (Econ)",
    "English Literature": "English Lit (Eng)",
    Chemistry: "Chemistry (Chem)",
  };

  const gradeMap = {
    A: "90 and above",
    B: "80 - 89",
    C: "70 - 79",
    D: "60 - 69",
    F: "Below 60",
  };

  const lineChartData = {
    labels: exams.map((exam) => exam.subject?.substring(0, 6) || "Unknown"),
    datasets: [
      {
        label: "Exam Duration (mins)",
        backgroundColor: "rgba(100, 149, 237, 0.2)", // Custom color
        borderColor: "rgb(100, 149, 237)", // Custom color
        fill: true,
        tension: 0.4,
        data: exams.map((exam) => exam.duration || 0),
      },
      {
        label: "Grades",
        backgroundColor: "rgba(119, 136, 153, 0.2)", // Custom color
        borderColor: "rgb(119, 136, 153)", // Custom color
        fill: true,
        tension: 0.4,
        data: exams.map((exam) => {
          const gradeScale = { A: 90, B: 80, C: 70, D: 60, F: 50 };
          return gradeScale[exam.grade] || 0;
        }),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-poppins">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg">
        <Sidebar></Sidebar>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8">
        <h1 className="text-3xl font-semibold text-blue-500 mb-8">
          Examination Results
        </h1>

        {/* Subject Abbreviations */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-blue-500 mb-4">
            Subject Abbreviations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.values(subjectMap).map((full) => (
              <div
                key={full}
                className="p-3 bg-blue-300 rounded-lg text-center text-white"
              >
                {full}
              </div>
            ))}
          </div>
        </div>

        {/* Grade Scale */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-blue-500 mb-4">
            Grade Scale
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(gradeMap).map(([grade, range]) => (
              <div
                key={grade}
                className="p-3 bg-blue-500 rounded-lg text-center text-white"
              >
                <strong>{grade}</strong>: {range}
              </div>
            ))}
          </div>
        </div>

        {/* Sorting */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-blue-500 mb-2 md:mb-0">
            Sort Records
          </h2>
          <select
            onChange={(e) => sortData(e.target.value)}
            className="w-full md:w-64 p-3 border-2 border-blue-500 rounded-lg text-indigo-500"
          >
            <option value="grade">Grade</option>
            <option value="duration">Duration</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-blue-500 text-white">
              <tr>
                {[
                  "Title",
                  "Subject",
                  "Date",
                  "Duration",
                  "Teacher",
                  "Grade",
                ].map((col, index) => (
                  <th
                    key={index}
                    className="p-4 text-left cursor-pointer hover:bg-blue-600 transition-colors"
                    onClick={() => sortData(col.toLowerCase())}
                  >
                    <div className="flex items-center">
                      {col}
                      {sortColumn === col.toLowerCase() && (
                        <span className="ml-2">
                          {sortOrder === "asc" ? (
                            <IoIosArrowUp color="#778899" />
                          ) : (
                            <IoIosArrowDown color="#778899" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {exams.length > 0 ? (
                exams.map((exam) => (
                  <tr key={exam._id} className="border-b hover:bg-blue-100">
                    <td className="p-4 text-indigo-500">
                      {exam.title || "N/A"}
                    </td>
                    <td className="p-4 text-indigo-500">
                      {exam.subject || "N/A"}
                    </td>
                    <td className="p-4 text-indigo-500">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-2" color="#778899" />
                        {exam.date
                          ? new Date(exam.date).toLocaleDateString()
                          : "N/A"}
                      </div>
                    </td>
                    <td className="p-4 text-indigo-500">
                      {exam.duration ? `${exam.duration} mins` : "N/A"}
                    </td>
                    <td className="p-4 text-indigo-500">
                      {exam.teacher || "N/A"}
                    </td>
                    <td className="p-4 text-indigo-500">
                      {exam.grade || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-indigo-500">
                    No exams available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue-500 mb-6">
            Performance Overview
          </h2>
          <div className="h-80 md:h-96">
            {exams.length > 0 ? (
              <Line
                ref={chartRef}
                data={lineChartData}
                options={chartOptions}
              />
            ) : (
              <p className="text-center text-indigo-500">No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamSection;
