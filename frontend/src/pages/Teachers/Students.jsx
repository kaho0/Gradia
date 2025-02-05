// // StudentSection.js
// import React, { useState, useEffect } from 'react';
// import Sidebar from './Sidebar';
// import axios from 'axios';
// import { StudentsContainer, Content, StudentsContent, StudentsHeader, StudentList, StudentItem, AddStudentForm, AddStudentInput,
//   AddStudentButton } from '../../styles/StudentsStyles';

// const StudentSection = () => {
//   const [newStudent, setNewStudent] = useState({ name: '', registrationNumber: '', grade: '' });
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get('http://localhost:4000/api/v1/students/getall');
//       setStudents(response.data.students);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     }
//   };

//   return (
//     <StudentsContainer>
//       <Sidebar />
//       <Content>
//         <StudentsContent>
//           <StudentsHeader>Students</StudentsHeader>
//           <StudentList>
//             {students.map((student) => (
//               <StudentItem key={student.id}>{student.name} - {student.registrationNumber} - {student.grade}</StudentItem>
//             ))}
//           </StudentList>
//         </StudentsContent>
//       </Content>
//     </StudentsContainer>
//   );
// };

// export default StudentSection;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaFilter, FaUser, FaTags } from "react-icons/fa"; // Import icons
import Sidebar from "./Sidebar";

const StudentSection = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGrade, setFilterGrade] = useState("");
  const [newStudent, setNewStudent] = useState({
    name: "",
    registrationNumber: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/students/getall"
      );
      setStudents(response.data.students);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      (filterGrade === "" || student.grade === filterGrade) &&
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50 font-poppins">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8">
        <h1 className="text-3xl font-semibold text-blue-500 mb-8">Students</h1>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 p-3 rounded-lg w-full">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Students"
                className="w-full text-gray-700 placeholder-gray-400 outline-none font-raleway"
              />
            </div>
            <div className="flex items-center border border-gray-300 p-3 rounded-lg">
              <FaFilter className="text-gray-500 mr-2" />
              <select
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
                className="w-32 text-gray-700 outline-none font-raleway"
              >
                <option value="">All Grades</option>
                <option value="A">Grade A</option>
                <option value="B">Grade B</option>
                <option value="C">Grade C</option>
              </select>
            </div>
          </div>
        </div>

        {/* Displaying Students */}
        <div>
          <ul className="space-y-6">
            {filteredStudents.map((student) => (
              <li
                key={student._id} // Use MongoDB _id instead of id
                className="p-6 border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 font-raleway"
              >
                <h3 className="text-xl font-semibold text-blue-700 font-ranch">
                  {student.name}
                </h3>

                <div className="flex items-center text-gray-600 mt-2">
                  <FaUser className="mr-2" />
                  <p>Registration Number: {student.registrationNumber}</p>
                </div>

                <div className="flex items-center text-gray-600 mt-2">
                  <FaTags className="mr-2" />
                  <p>Grade: {student.grade}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentSection;
