import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
  FaSearch,
  FaFilter,
  FaUser,
  FaTags,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaCalendarAlt, // Added for events
} from "react-icons/fa"; // Import icons for consistency

const StudentDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [events, setEvents] = useState([]); // Added for events
  const [performanceData, setPerformanceData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Fetch assignments from the backend API
    axios
      .get("/api/v1/assignments")
      .then((response) => {
        // Ensure the response data is an array
        if (Array.isArray(response.data)) {
          setAssignments(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
          setAssignments([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching assignments:", error);
        setAssignments([]); // Set to empty array in case of error
      });

    // Fetch events from the backend API
    axios
      .get("http://localhost:4000/api/v1/events/getall") // Added event fetch request
      .then((response) => {
        if (response.data.success && Array.isArray(response.data.events)) {
          setEvents(response.data.events);
        } else {
          console.error("Unexpected response structure:", response.data);
          setEvents([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setEvents([]);
      });

    // Example performance data
    setPerformanceData({
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Performance",
          data: [65, 59, 80, 81],
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
        },
      ],
    });
  }, []);

  const assignmentChartData = {
    labels: assignments.map((assignment) => assignment.title),
    datasets: [
      {
        label: "Grades",
        data: assignments.map((assignment) => assignment.grade),
        backgroundColor: "rgba(0, 51, 102, 0.6)",
        borderColor: "rgba(0, 51, 102, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 text-white min-h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6 bg-gray-50">
        <h1 className="text-3xl font-poppins font-semibold text-blue-600 mb-6">
          Student Dashboard
        </h1>

        {/* Overview Section */}
        <section>
          <h2 className="text-2xl font-poppins font-semibold text-blue-600 mb-4">
            Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-raleway font-semibold">
                Assignments
              </h3>
              <p className="text-2xl font-ranch">{assignments.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-raleway font-semibold">
                Performance
              </h3>
              <p className="text-2xl font-ranch">85%</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-raleway font-semibold">Term</h3>
              <p className="text-2xl font-ranch">1</p>
            </div>
          </div>
        </section>

        {/* Assignment Grades Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-poppins font-semibold text-blue-600 mb-4">
            Assignment Grades
          </h2>
          <div className="h-64">
            {" "}
            {/* Added fixed height container */}
            {assignments.length > 0 ? (
              <Bar
                data={assignmentChartData}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                }}
              />
            ) : (
              <p className="text-gray-600 font-raleway">
                No assignment data available.
              </p>
            )}
          </div>
        </section>

        {/* Performance Over Time Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-poppins font-semibold text-blue-600 mb-4">
            Performance Over Time
          </h2>
          <div className="h-64">
            {" "}
            {/* Added fixed height container */}
            {performanceData.datasets.length > 0 ? (
              <Line
                data={performanceData}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                }}
              />
            ) : (
              <p className="text-gray-600 font-raleway">
                No performance data available.
              </p>
            )}
          </div>
        </section>

        {/* Recent Activity Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-poppins font-semibold text-blue-600 mb-4">
            Recent Activity
          </h2>
          {/* Add a list of recent activity items */}
        </section>

        {/* Upcoming Events Section */}
        <section>
          <h2 className="text-2xl font-poppins font-semibold text-blue-600 mb-4">
            Upcoming Events
          </h2>
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4"
                >
                  <FaCalendarAlt className="text-blue-600 text-2xl" />
                  <div>
                    <h3 className="text-lg font-raleway font-semibold">
                      {event.name} {/* Changed from title to name */}
                    </h3>
                    <p className="text-gray-600 font-roboto">
                      {new Date(event.date).toLocaleDateString()}{" "}
                      {/* Format the date */}
                    </p>
                    <p className="text-sm text-gray-500">{event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 font-raleway">
              No upcoming events available.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;
