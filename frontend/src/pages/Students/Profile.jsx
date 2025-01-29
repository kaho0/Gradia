import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaGraduationCap, FaPhone, FaEnvelope } from "react-icons/fa";

const ProfileSection = () => {
  const [studentProfile, setStudentProfile] = useState({
    name: "",
    registrationNumber: "",
    grade: "",
    age: "",
    gender: "",
    email: "",
    profileImage: "https://via.placeholder.com/150",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentProfile({
      ...studentProfile,
      [name]: value,
    });
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
          alert("Profile saved successfully!");
        } else {
          alert("Error saving profile.");
        }
      })
      .catch((err) => console.error("Error submitting student data:", err));
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4">
        <Sidebar />
      </div>

      {/* Profile Content */}
      <div className="w-3/4 p-6">
        <h2 className="text-2xl font-semibold mb-4">Create/Update Profile</h2>

        {/* Profile Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-6"
        >
          {/* Profile Image */}
          <div className="mb-4">
            <label htmlFor="profileImage" className="block font-semibold mb-2">
              Profile Image URL
            </label>
            <input
              type="text"
              id="profileImage"
              name="profileImage"
              value={studentProfile.profileImage}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={studentProfile.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Registration Number */}
          <div className="mb-4">
            <label
              htmlFor="registrationNumber"
              className="block font-semibold mb-2"
            >
              Registration Number
            </label>
            <input
              type="text"
              id="registrationNumber"
              name="registrationNumber"
              value={studentProfile.registrationNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Grade */}
          <div className="mb-4">
            <label htmlFor="grade" className="block font-semibold mb-2">
              Grade
            </label>
            <input
              type="text"
              id="grade"
              name="grade"
              value={studentProfile.grade}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Age */}
          <div className="mb-4">
            <label htmlFor="age" className="block font-semibold mb-2">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={studentProfile.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label htmlFor="gender" className="block font-semibold mb-2">
              Gender
            </label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={studentProfile.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={studentProfile.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSection;
