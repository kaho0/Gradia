import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
  FaChalkboardTeacher,
  FaClipboardList,
  FaBookReader,
  FaCalendarCheck,
  FaBullhorn,
  FaUserCog,
} from "react-icons/fa"; // Import new icons
import logo from "/lo.png"; // Adjust the path to your logo

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // State to manage sidebar open/close
  const navigate = useNavigate(); // Hook for navigation

  // Logout Functionality
  const handleLogout = () => {
    localStorage.removeItem("studentProfile"); // Clear the saved profile
    navigate("/"); // Redirect to the home page
  };

  return (
    <div
      className={`h-screen fixed top-0 left-0 transition-all duration-300 
      ${isOpen ? "w-64" : "w-20"} 
      bg-gradient-to-b from-blue-900 to-purple-900 shadow-lg text-white`}
    >
      {/* Logo */}
      <div className="flex justify-center py-4">
        <img
          src={logo}
          alt="Logo"
          className={`transition-all duration-300 ${
            !isOpen ? "w-10 h-10" : "w-26 h-12"
          }`}
        />
      </div>

      {/* Sidebar Title */}
      <h2
        className={`text-center text-lg font-semibold mb-6 transition-all duration-300 ${
          !isOpen ? "opacity-0" : "opacity-100"
        }`}
      >
        Teacher
      </h2>

      {/* Sidebar Navigation */}
      <ul className="space-y-2">
        <SidebarItem
          isOpen={isOpen}
          Icon={FaChalkboardTeacher}
          text="Dashboard"
          link="/teacher/dashboard"
        />
        <SidebarItem
          isOpen={isOpen}
          Icon={FaClipboardList}
          text="Classes"
          link="/teacher/classes"
        />
        <SidebarItem
          isOpen={isOpen}
          Icon={FaClipboardList}
          text="Students"
          link="/teacher/students"
        />
        <SidebarItem
          isOpen={isOpen}
          Icon={FaChalkboardTeacher}
          text="Teachers"
          link="/teacher/teachers"
        />
        <SidebarItem
          isOpen={isOpen}
          Icon={FaClipboardList}
          text="Assignments"
          link="/teacher/assignments"
        />
        <SidebarItem
          isOpen={isOpen}
          Icon={FaBookReader}
          text="Submissions"
          link="/teacher/submissions"
        />
        <SidebarItem
          isOpen={isOpen}
          Icon={FaCalendarCheck}
          text="Attendance"
          link="/teacher/attendance"
        />
        <SidebarItem
          isOpen={isOpen}
          Icon={FaBullhorn}
          text="Announcement"
          link="/teacher/announcements"
        />
        <SidebarItem
          isOpen={isOpen}
          Icon={FaUserCog}
          text="Settings & Profile"
          link="/teacher/settings"
        />

        {/* Logout Button */}
        <li>
          <button
            onClick={handleLogout}
            className={`flex items-center space-x-4 px-4 py-2 w-full hover:bg-white hover:text-indigo-600 rounded-lg transition ${
              !isOpen ? "justify-center" : ""
            }`}
          >
            <FaSignOutAlt className="text-xl" />
            {isOpen && <span className="text-base">Logout</span>}
          </button>
        </li>
      </ul>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-indigo-600 p-2 rounded-full shadow-md hover:bg-gray-100 transition"
      >
        {isOpen ? "◀" : "▶"}
      </button>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ isOpen, Icon, text, link }) => (
  <li>
    <Link
      to={link}
      className={`flex items-center space-x-4 px-4 py-2 hover:bg-white hover:text-indigo-600 rounded-lg transition ${
        !isOpen ? "justify-center" : ""
      }`}
    >
      <Icon className="text-xl" />
      {isOpen && <span className="text-base">{text}</span>}
    </Link>
  </li>
);

export default Sidebar;
