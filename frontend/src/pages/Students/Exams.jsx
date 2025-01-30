import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

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
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "#FF6384",
        fill: true,
        tension: 0.4,
        data: exams.map((exam) => exam.duration || 0),
      },
      {
        label: "Grades",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "#36A2EB",
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
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-white shadow-md p-5">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 p-4 md:p-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-6 font-ranch">
          Exam Results
        </h1>

        {/* Subject Abbreviations */}
        <div className="bg-white p-6 shadow-md rounded-lg mb-6">
          <h2 className="text-lg font-semibold mb-2 font-raleway">
            Subject Abbreviations
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm font-raleway">
            {Object.values(subjectMap).map((full) => (
              <div
                key={full}
                className="p-2 bg-gray-200 rounded-lg text-center"
              >
                {full}
              </div>
            ))}
          </div>
        </div>

        {/* Grade Scale */}
        <div className="bg-white p-6 shadow-md rounded-lg mb-6">
          <h2 className="text-lg font-semibold mb-2 font-raleway">
            Grade Scale
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm font-raleway">
            {Object.entries(gradeMap).map(([grade, range]) => (
              <div
                key={grade}
                className="p-2 bg-gray-200 rounded-lg text-center"
              >
                <strong>{grade}</strong>: {range}
              </div>
            ))}
          </div>
        </div>

        {/* Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 font-raleway">
          <label className="text-lg font-semibold">Sort by:</label>
          <select
            onChange={(e) => sortData(e.target.value)}
            className="p-2 border rounded-lg mt-2 md:mt-0"
          >
            <option value="grade">Grade</option>
            <option value="duration">Time</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white p-6 shadow-md rounded-lg overflow-x-auto mb-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-600 text-white text-lg font-raleway">
                {[
                  "Title",
                  "Subject",
                  "Date",
                  "Duration (mins)",
                  "Teacher",
                  "Grade",
                ].map((col, index) => (
                  <th
                    key={index}
                    className="p-3 cursor-pointer hover:bg-blue-500"
                    onClick={() => sortData(col.toLowerCase())}
                  >
                    {col}{" "}
                    {sortColumn === col.toLowerCase() &&
                      (sortOrder === "asc" ? (
                        <IoIosArrowUp />
                      ) : (
                        <IoIosArrowDown />
                      ))}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-raleway">
              {exams.length > 0 ? (
                exams.map((exam) => (
                  <tr
                    key={exam._id}
                    className="border border-gray-300 text-center hover:bg-gray-200 text-m"
                  >
                    <td className="p-3">{exam.title || "N/A"}</td>
                    <td className="p-3">{exam.subject || "N/A"}</td>
                    <td className="p-3">
                      {exam.date
                        ? new Date(exam.date).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="p-3">
                      {exam.duration ? `${exam.duration} mins` : "N/A"}
                    </td>
                    <td className="p-3">{exam.teacher || "N/A"}</td>
                    <td className="p-3">{exam.grade || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-3 text-center">
                    No exams available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Line Chart */}
        <div className="mt-6 bg-white p-6 shadow-md rounded-lg h-96">
          <h2 className="text-xl font-semibold mb-4 font-raleway">
            Exam Duration & Grades Graph
          </h2>
          {exams.length > 0 ? (
            <Line ref={chartRef} data={lineChartData} options={chartOptions} />
          ) : (
            <p className="text-center text-gray-600">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamSection;
