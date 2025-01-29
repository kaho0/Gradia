import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginIllustration from "/log.jpg"; // Replace with actual image path

const StudentSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("Student Sign In:", { email, password });

    // Replace with actual authentication logic
    navigate("/student/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      <div className="bg-white shadow-lg rounded-lg flex w-[90%] max-w-4xl">
        {/* Left Side - Illustration */}
        <div className="hidden md:flex flex-1 items-center justify-center p-8">
          <img
            src={loginIllustration}
            alt="Login Illustration"
            className="max-w-[80%]"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 p-8">
          <h2 className="text-3xl font-semibold text-blue-900">Welcome Back</h2>
          <p className="text-gray-600 mb-6">Login to your account</p>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-blue-800">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-blue-800">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="text-right text-sm mt-2">
                <a href="#" className="text-blue-500 hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
            >
              Sign In
            </button>
          </form>

          {/* Sign-up Link */}

          {/* Social Login */}
          <div className="mt-6 flex items-center justify-center space-x-4">
            <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
              <i className="fab fa-facebook-f text-blue-600"></i>
            </button>
            <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
              <i className="fab fa-linkedin-in text-blue-500"></i>
            </button>
            <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
              <i className="fab fa-google text-red-500"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSignIn;
