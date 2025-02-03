import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar"; // Import your Sidebar component
import axios from "axios";
import {
  FaSearch,
  FaFilter,
  FaUser,
  FaTags,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
} from "react-icons/fa"; // Import icons

const LibrarySection = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState(""); // Default to show all books

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/library/getall"
      );
      setBooks(response.data.books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      (filterStatus === "" || book.status === filterStatus) &&
      book.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50 font-poppins">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8">
        <h1 className="text-3xl font-semibold text-blue-500 mb-8">Library</h1>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 p-3 rounded-lg w-full">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Books"
                className="w-full text-gray-700 placeholder-gray-400 outline-none font-raleway"
              />
            </div>
            <div className="flex items-center border border-gray-300 p-3 rounded-lg">
              <FaFilter className="text-gray-500 mr-2" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-32 text-gray-700 outline-none font-raleway"
              >
                <option value="">All Books</option>
                <option value="available">Available</option>
                <option value="borrowed">Borrowed</option>
                <option value="reserved">Reserved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Displaying Books */}
        <div>
          <ul className="space-y-6">
            {filteredBooks.map((book) => (
              <li
                key={book._id}
                className="p-6 border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 font-raleway"
              >
                <h3 className="text-xl font-semibold text-blue-700 font-ranch">
                  {book.name}
                </h3>

                <div className="flex items-center text-gray-600 mt-2">
                  <FaUser className="mr-2" />
                  <p>Author: {book.author}</p>
                </div>

                <div className="flex items-center text-gray-600 mt-2">
                  <FaTags className="mr-2" />
                  <p>Category: {book.category}</p>
                </div>

                <div className="flex items-center mt-2">
                  {book.status === "available" && (
                    <span className="text-green-500 flex items-center">
                      <FaCheckCircle className="mr-1" /> Available
                    </span>
                  )}
                  {book.status === "borrowed" && (
                    <span className="text-red-500 flex items-center">
                      <FaTimesCircle className="mr-1" /> Borrowed
                    </span>
                  )}
                  {book.status === "reserved" && (
                    <span className="text-yellow-500 flex items-center">
                      <FaExclamationCircle className="mr-1" /> Reserved
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LibrarySection;
