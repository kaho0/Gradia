import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaPhone, FaEnvelope } from "react-icons/fa";

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

  const [submittedProfile, setSubmittedProfile] = useState(null);

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
          setSubmittedProfile(studentProfile); // Update submitted profile for preview
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

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <h2 className="text-2xl font-semibold mb-4">Create/Update Profile</h2>

        {/* Profile Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-6 mb-6"
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

          {/* Other Input Fields */}
          {[
            "name",
            "registrationNumber",
            "grade",
            "age",
            "gender",
            "email",
          ].map((field) => (
            <div className="mb-4" key={field}>
              <label
                htmlFor={field}
                className="block font-semibold mb-2 capitalize"
              >
                {field === "registrationNumber" ? "Registration Number" : field}
              </label>
              <input
                type={
                  field === "age"
                    ? "number"
                    : field === "email"
                    ? "email"
                    : "text"
                }
                id={field}
                name={field}
                value={studentProfile[field]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required={field !== "profileImage"}
              />
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Save Profile
          </button>
        </form>

        {/* Profile Preview */}
        {submittedProfile && (
          <div className="bg-white shadow-lg rounded-xl p-6 flex items-center">
            <img
              src={submittedProfile.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full mr-6"
            />
            <div>
              <h3 className="text-xl font-semibold">{submittedProfile.name}</h3>
              <p className="text-gray-500 mb-2">{submittedProfile.grade}</p>
              <p className="text-gray-500">
                Age: {submittedProfile.age} | Gender: {submittedProfile.gender}
              </p>
              <p className="text-gray-500">Email: {submittedProfile.email}</p>
              <div className="flex mt-4 space-x-4">
                <FaPhone className="text-blue-500" />
                <FaEnvelope className="text-blue-500" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
