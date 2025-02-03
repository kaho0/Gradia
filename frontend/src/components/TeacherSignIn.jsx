// TeacherSignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginIllustration from "/log.jpg"; // Make sure this image exists

const TeacherSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    
    // Save teacher info in localStorage
    const teacherInfo = {
      email: email,
    };
    localStorage.setItem('teacherInfo', JSON.stringify(teacherInfo));

    // Redirect to settings page
    navigate("/teacher/settings");
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
          <h2 className="text-3xl font-semibold text-blue-900">Welcome Teacher</h2>
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

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

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

          {/* Additional Info */}
          <p className="text-center text-gray-600 mt-8">
            Need help? Contact{" "}
            <a href="#" className="text-blue-500 hover:underline">
              support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherSignIn;
