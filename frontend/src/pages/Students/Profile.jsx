import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import {
  FaPhone,
  FaEnvelope,
  FaUser,
  FaBook,
  FaVenusMars,
} from "react-icons/fa";

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
    const savedProfile = localStorage.getItem("studentProfile");
    if (savedProfile) {
      setSubmittedProfile(JSON.parse(savedProfile));
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
          localStorage.setItem(
            "studentProfile",
            JSON.stringify(studentProfile)
          );
          setSubmittedProfile(studentProfile);
        } else {
          alert("Error saving profile.");
        }
      })
      .catch((err) => console.error("Error submitting student data:", err));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/4">
        <Sidebar />
      </div>

      <div className="w-3/4 p-8">
        {submittedProfile ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <div className="flex flex-col items-center mb-8">
                <img
                  src={submittedProfile.profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-800">
                  {submittedProfile.name}
                </h2>
                <p className="text-gray-500">
                  @{submittedProfile.registrationNumber}
                </p>
              </div>

              <div className="flex justify-center gap-6 mb-8">
                <div className="text-center bg-blue-50 p-4 rounded-2xl w-24">
                  <FaUser className="text-blue-500 mx-auto text-xl" />
                  <p className="font-bold mt-1">{submittedProfile.age}</p>
                  <p className="text-xs text-gray-500">Age</p>
                </div>
                <div className="text-center bg-purple-50 p-4 rounded-2xl w-24">
                  <FaBook className="text-purple-500 mx-auto text-xl" />
                  <p className="font-bold mt-1">{submittedProfile.grade}</p>
                  <p className="text-xs text-gray-500">Grade</p>
                </div>
                <div className="text-center bg-pink-50 p-4 rounded-2xl w-24">
                  <FaVenusMars className="text-pink-500 mx-auto text-xl" />
                  <p className="font-bold mt-1 capitalize">
                    {submittedProfile.gender}
                  </p>
                  <p className="text-xs text-gray-500">Gender</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center bg-gray-50 p-4 rounded-xl">
                  <FaEnvelope className="text-gray-500 mr-3" />
                  <a
                    href={`mailto:${submittedProfile.email}`}
                    className="text-gray-700 hover:text-blue-500"
                  >
                    {submittedProfile.email}
                  </a>
                </div>
                <div className="flex items-center bg-gray-50 p-4 rounded-xl">
                  <FaPhone className="text-gray-500 mr-3" />
                  <span className="text-gray-700">(555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Create Your Profile
            </h2>
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-lg rounded-2xl p-6"
            >
              {[
                "name",
                "registrationNumber",
                "grade",
                "age",
                "gender",
                "email",
              ].map((field) => (
                <div className="mb-4" key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {field === "registrationNumber"
                      ? "Registration Number"
                      : field}
                  </label>
                  <input
                    type={
                      field === "age"
                        ? "number"
                        : field === "email"
                        ? "email"
                        : "text"
                    }
                    name={field}
                    value={studentProfile[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              ))}

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Save Profile
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
