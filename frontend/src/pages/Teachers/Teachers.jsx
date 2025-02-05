// TeacherSection.js
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const TeacherSection = () => {
  // const [newTeacher, setNewTeacher] = useState({ name: '', email: '', subject: '' });
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/teachers/getall"
      );
      setTeachers(response.data.teachers);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Teachers</h1>
          <ul>
            {teachers &&
              teachers.map((teacher) => (
                <li key={teacher.id} className="mb-2 p-4 border rounded-lg">
                  {teacher.name} - {teacher.email} - {teacher.subject}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeacherSection;
