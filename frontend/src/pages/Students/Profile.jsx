import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import {
  FaPhone,
  FaEnvelope,
  FaUser,
  FaBook,
  FaVenusMars,
} from "react-icons/fa";

import toast, { Toaster } from "react-hot-toast";

const ProfileSection = () => {
  const [studentProfile, setStudentProfile] = useState({
    name: "",
    registrationNumber: "",
    grade: "",
    age: "",
    gender: "",
    email: "",
    profileImage: "https://avatar.iran.liara.run/public/boy", // Default to male avatar
  });

  const [submittedProfile, setSubmittedProfile] = useState(null);

  useEffect(() => {
    // Check for existing profile first
    const savedProfile = localStorage.getItem("studentProfile");
    if (savedProfile) {
      setSubmittedProfile(JSON.parse(savedProfile));
    } else {
      // If no profile exists, get email from studentInfo
      const studentInfo = JSON.parse(localStorage.getItem("studentInfo"));
      if (studentInfo?.email) {
        setStudentProfile((prev) => ({
          ...prev,
          email: studentInfo.email,
        }));
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentProfile((prev) => ({
      ...prev,
      [name]: value,
      profileImage:
        name === "gender"
          ? `https://avatar.iran.liara.run/public/${
              value === "female" ? "girl" : "boy"
            }`
          : prev.profileImage,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/api/v1/students/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentProfile),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Store the complete student data including _id from the response
          console.log("Student created successfully:", data.student);
          localStorage.setItem(
            "studentProfile",
            JSON.stringify(data.student) // Store the complete student object from response
          );
          setSubmittedProfile(data.student); // Use the response data
          toast.success("Profile created successfully! 🎉", {
            duration: 3000,
            position: "top-center",
            style: {
              background: "#4CAF50",
              color: "#fff",
              borderRadius: "10px",
              padding: "16px",
            },
          });
        } else {
          toast.error(data.message || "Error saving profile.");
        }
      })
      .catch((err) => {
        console.error("Error submitting student data:", err);
        toast.error("Something went wrong. Please try again.");
      });
  };

  const handleEdit = () => {
    // Pre-fill the form with existing profile data
    setStudentProfile(submittedProfile);
    setSubmittedProfile(null);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const studentId = studentProfile._id;

    fetch(`http://localhost:4000/api/v1/students/${studentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentProfile),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("studentProfile", JSON.stringify(data.student));
          setSubmittedProfile(data.student);
          toast.success("Profile updated successfully! 🎉", {
            duration: 3000,
            position: "top-center",
          });
        } else {
          toast.error(data.message || "Error updating profile.");
        }
      })
      .catch((err) => {
        console.error("Error updating student data:", err);
        toast.error("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="w-1/4">
        <Sidebar />
      </div>

      <div className="w-3/4 p-8">
        {submittedProfile ? (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-[1.01]">
              {/* Header Section */}
              <div className="flex flex-col items-center mb-10">
                <div className="relative">
                  <img
                    src={submittedProfile.profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-xl mb-4 transform transition-all duration-300 hover:scale-110"
                  />
                  <div className="absolute bottom-6 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {submittedProfile.name}
                </h2>
                <p className="text-gray-500 bg-gray-100 px-4 py-1 rounded-full text-sm">
                  @{submittedProfile.registrationNumber}
                </p>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-6 mb-10">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl text-center transform transition-all duration-300 hover:shadow-lg">
                  <FaUser className="text-blue-600 text-2xl mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-900">
                    {submittedProfile.age}
                  </p>
                  <p className="text-blue-600 text-sm uppercase tracking-wider">
                    Age
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl text-center transform transition-all duration-300 hover:shadow-lg">
                  <FaBook className="text-purple-600 text-2xl mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-900">
                    {submittedProfile.grade}
                  </p>
                  <p className="text-purple-600 text-sm uppercase tracking-wider">
                    Grade
                  </p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl text-center transform transition-all duration-300 hover:shadow-lg">
                  <FaVenusMars className="text-pink-600 text-2xl mx-auto mb-2" />
                  <p className="text-2xl font-bold text-pink-900 capitalize">
                    {submittedProfile.gender}
                  </p>
                  <p className="text-pink-600 text-sm uppercase tracking-wider">
                    Gender
                  </p>
                </div>
              </div>

              {/* Contact Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Contact Information
                </h3>
                <div className="flex items-center bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl transform transition-all duration-300 hover:shadow-md">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaEnvelope className="text-blue-600 text-xl" />
                  </div>
                  <a
                    href={`mailto:${submittedProfile.email}`}
                    className="ml-4 text-gray-700 hover:text-blue-600 transition-colors duration-300"
                  >
                    {submittedProfile.email}
                  </a>
                </div>
                <div className="flex items-center bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl transform transition-all duration-300 hover:shadow-md">
                  <div className="bg-green-100 p-3 rounded-full">
                    <FaPhone className="text-green-600 text-xl" />
                  </div>
                  <span className="ml-4 text-gray-700">(555) 123-4567</span>
                </div>
              </div>

              {/* Edit Button */}
              <button
                className="w-full mt-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handleEdit}
              >
                Edit Profile
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-blue-900">
                {studentProfile._id
                  ? "Edit Your Profile"
                  : "Complete Your Profile"}
              </h2>
              <p className="text-gray-600 mt-2">
                {studentProfile._id
                  ? "Update your information below"
                  : "Tell us more about yourself to personalize your experience"}
              </p>
            </div>

            <form
              onSubmit={studentProfile._id ? handleUpdate : handleSubmit}
              className="bg-white shadow-2xl rounded-3xl p-8 backdrop-blur-lg backdrop-filter"
            >
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    field: "name",
                    icon: <FaUser className="text-blue-500" />,
                    type: "text",
                  },
                  {
                    field: "registrationNumber",
                    icon: <FaBook className="text-blue-500" />,
                    type: "text",
                  },
                  {
                    field: "grade",
                    icon: <FaBook className="text-blue-500" />,
                    type: "text",
                  },
                  {
                    field: "age",
                    icon: <FaUser className="text-blue-500" />,
                    type: "number",
                  },
                  {
                    field: "gender",
                    icon: <FaVenusMars className="text-blue-500" />,
                    type: "select",
                    options: ["Male", "Female"],
                  },
                  {
                    field: "email",
                    icon: <FaEnvelope className="text-blue-500" />,
                    type: "email",
                  },
                ].map(({ field, icon, type, options }) => (
                  <div className="mb-4" key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                      {field === "registrationNumber"
                        ? "Registration Number"
                        : field}
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        {icon}
                      </div>
                      {type === "select" ? (
                        <select
                          name={field}
                          value={studentProfile[field]}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select {field}</option>
                          {options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={type}
                          name={field}
                          value={studentProfile[field]}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                          disabled={field === "email"}
                          placeholder={`Enter your ${
                            field === "registrationNumber"
                              ? "registration number"
                              : field
                          }`}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {studentProfile._id ? "Update Profile" : "Complete Profile"}
              </button>

              {studentProfile._id && (
                <button
                  type="button"
                  onClick={() => {
                    setStudentProfile({
                      name: "",
                      registrationNumber: "",
                      grade: "",
                      age: "",
                      gender: "",
                      email: "",
                      profileImage: "https://avatar.iran.liara.run/public/boy",
                    });
                    setSubmittedProfile(null);
                  }}
                  className="w-full mt-4 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                >
                  Cancel
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
