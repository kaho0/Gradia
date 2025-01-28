// Home.js
import React from "react";
import "../App.css";
import bg from "../assets/bg.png";
import bg1 from "../assets/bg1.png";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/choose-user");
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>About Gradia</a>
              </li>
              <li>
                <a>Academic Programs</a>
              </li>
              <li>
                <a>Contact</a>
              </li>
            </ul>
          </div>
          <img src={bg1} alt="Gradia Logo" className="h-12 ml-4" />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a className="text-lg font-semibold">About Gradia</a>
            </li>
            <li>
              <a className="text-lg font-semibold">Academic Programs</a>
            </li>
            <li>
              <a className="text-lg font-semibold">Contact</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <button onClick={handleLoginClick} className="btn btn-primary mr-2">
            Sign In
          </button>
          <button onClick={handleLoginClick} className="btn btn-ghost">
            Guest Mode
          </button>
        </div>
      </div>
      <HomeContainer>
        <SchoolInfo>
          <Title>Welcome to Gradia</Title>
          <LoremTextContainer>
            <p>
              Gradia is a state-of-the-art Educational Database Management
              System that transforms how educational institutions handle their
              data. Our platform offers comprehensive solutions for managing
              student records, attendance tracking, grade management, and
              curriculum planning. With powerful analytics tools, automated
              reporting features, and secure data storage, Gradia helps
              educators focus on what matters most - teaching. Experience
              seamless integration of administrative tasks, real-time
              performance monitoring, and enhanced communication between staff,
              students, and parents.
            </p>
          </LoremTextContainer>
          <AdminRegisterLink to="/admin/register">
            Admin Register
          </AdminRegisterLink>
        </SchoolInfo>
        <SchoolImage src={bg} alt="Students Learning" />
      </HomeContainer>
    </>
  );
};

export default Home;
