import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BsGraphUp,
  BsFileText,
  BsBook,
  BsGraphDown,
  BsCalendar,
  BsChatDots,
  BsGear,
} from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa"; // Logout icon
import logo from "/g.png"; // Adjust the path to your logo

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
          className={`w-27 h-12 transition-all duration-300 ${
            !isOpen ? "scale-90" : "scale-100"
          }`}
        />
      </div>

      {/* Sidebar Title */}
      <h2
        className={`text-center text-lg font-semibold mb-6 transition-all duration-300 ${
          !isOpen ? "opacity-0" : "opacity-100"
        }`}
      >
        Student
      </h2>

      {/* Sidebar Navigation */}
      <ul className="space-y-2">
        <SidebarItem
          isOpen={isOpen}
          Icon={BsGraphUp}
          text="Dashboard"
          link="/student/dashboard"
        />
        <SidebarItem
          isOpen={isOpen}
          Icon={BsFileText}
          text="Assignments"
          link="/student/assignments"
        />
        <SidebarItem
          isOpen={isOpen}
          Icon={BsBook}
          text="Exams"
          link="/student/exams"
        />
        <SidebarItem
          isOpen={isOpen}
          Icon={BsGraphDown}
          text="Ratings"
          link="/student/ratings"
        />
        <SidebarItem
          isOpen={isOpen}
          Icon={BsCalendar}
          text="Attendance"
          link="/student/attendance"
        />
        <SidebarItem
          isOpen={isOpen}
          Icon={BsBook}
          text="Library"
          link="/student/library"
        />
        <SidebarItem
          isOpen={isOpen}
          Icon={BsChatDots}
          text="Announcements"
          link="/student/communication"
        />
        <SidebarItem
          isOpen={isOpen}
          Icon={BsGear}
          text="Profile"
          link="/student/settings"
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
