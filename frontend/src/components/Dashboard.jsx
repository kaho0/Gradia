import React from "react";
import { FaFire, FaEye, FaCubes } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* Trusted By Section */}
      <div className="bg-white shadow-md rounded-lg p-6 text-center mb-10">
        <h2 className="text-xl font-bold mb-6 text-black">
          Trusted by companies like
        </h2>
        <div className="flex justify-center space-x-6">
          <FaCubes className="text-4xl text-gray-500" />
          <FaFire className="text-4xl text-gray-500" />
          <FaEye className="text-4xl text-gray-500" />
          <FaCubes className="text-4xl text-gray-500" />
          <FaFire className="text-4xl text-gray-500" />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Task Cards */}
        <div className="grid grid-cols-2 gap-6">
          {[
            {
              title: "Student Records",
              category: "Management",
              date: "📅 10 Mar 2023",
            },
            {
              title: "Attendance Tracking",
              category: "Automation",
              date: "📅 12 Apr 2023",
            },
            {
              title: "Grade Management",
              category: "Assessment",
              date: "📅 5 May 2023",
            },
            {
              title: "Curriculum Planning",
              category: "Academics",
              date: "📅 20 Jun 2023",
            },
          ].map((task, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-600">
                Gradia is a school management platform that provides a seamless
                experience for educators, students, and administrators.
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="bg-yellow-300 text-yellow-800 text-xs px-3 py-1 rounded-full">
                  {task.category}
                </span>
                <span className="text-gray-500 text-sm">{task.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Create Task Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Create Your Task</h2>
          <p className="text-gray-600 mb-6">
            Gradia is a school management solution that offers a personalized
            portal for teachers, students, and parents, ensuring seamless
            communication and academic progress tracking.
          </p>
          <input
            type="text"
            placeholder="Enter task title"
            className="w-full border px-4 py-2 rounded-md mb-4"
          />
          <input
            type="text"
            placeholder="Enter task description"
            className="w-full border px-4 py-2 rounded-md mb-6"
          />
          <div className="bg-blue-500 text-white p-4 rounded-lg">
            <h3 className="font-bold">Manage Tasks with Ease</h3>
            <p className="text-sm mt-2">
              Gradia enhances communication between students, teachers, and
              parents, providing an intuitive platform for task management and
              academic tracking.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-blue-600">
          Pick up the best plan
        </h2>
        <p className="text-gray-600 mt-2 mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus odio
          pellentesque pellentesque.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {["", "bg-blue-900 text-white", ""].map((style, index) => (
            <div
              key={index}
              className={`border p-6 rounded-lg shadow-lg ${style}`}
            >
              <h3 className="text-lg font-semibold mb-2">Standard</h3>
              <p className="text-sm mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <h4 className="text-2xl font-bold">
                $15 <span className="text-sm">/Month</span>
              </h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li>✅ For 1-10 people in a team</li>
                <li>✅ For 1-10 people in a team</li>
                <li>✅ For 1-10 people in a team</li>
              </ul>
              <button className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg">
                Choose
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
