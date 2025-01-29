import React from "react";
import {
  FaGraduationCap,
  FaBook,
  FaEnvelope,
  FaSignInAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../index.css";
import bg1 from "../assets/bg1.png";
import addedImage from "/s.png";
import Dashboard from "./Dashboard";
import Footer from "./Footer";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/choose-user");
  };

  return (
    <>
      {/* Navbar */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 shadow-lg">
        <div className="flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img src={bg1} alt="Gradia Logo" className="h-12" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex">
            <ul className="flex space-x-6 text-white">
              <li className="flex items-center space-x-2">
                <FaGraduationCap />
                <a href="#" className="text-lg font-medium hover:underline">
                  About Gradia
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FaBook />
                <a href="#" className="text-lg font-medium hover:underline">
                  Academic Programs
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope />
                <a href="#" className="text-lg font-medium hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Sign In Button */}
          <div className="flex space-x-4">
            <button
              onClick={handleNavigation}
              className="flex items-center px-6 py-2 bg-blue-500 text-white text-sm font-medium rounded-full shadow-md hover:bg-blue-600"
            >
              <FaSignInAlt className="mr-2" />
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Main Section with Half Blue Background */}
      <div className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-8">
        {/* Blue Gradient Background */}
        <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-r from-blue-900 to-blue-700"></div>

        {/* Content Section */}
        <div className="relative z-10 flex flex-col items-center text-center py-16">
          {/* Info Section */}
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Welcome to Gradia
            </h1>
            <p className="text-lg leading-relaxed mb-8">
              Gradia is a state-of-the-art educational platform designed to
              revolutionize how schools and institutions manage their data. From
              student records and attendance tracking to grade management and
              curriculum planning, Gradia provides comprehensive tools that
              streamline administrative tasks.
            </p>
          </div>

          {/* Centered Get Started Button */}
          <div className="w-full flex justify-center">
            <button
              onClick={handleNavigation}
              className="flex items-center px-6 md:px-8 py-3 bg-white text-blue-900 text-lg font-medium rounded-full shadow-lg hover:bg-gray-200"
            >
              <FaGraduationCap className="mr-2" />
              Get Started
            </button>
          </div>

          {/* Added Image Section */}
          <div className="w-full max-w-4xl mx-auto mt-10 px-4">
            <img
              src={addedImage}
              alt="Middle Section"
              className="rounded-lg shadow-lg border border-gray-300 w-full object-cover"
            />
          </div>
        </div>

        {/* White Background Section */}
        <div className="bg-white py-14 px-4 sm:px-8 w-full">
          <Dashboard />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
