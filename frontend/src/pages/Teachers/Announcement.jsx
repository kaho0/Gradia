import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const CheckAnnouncementSection = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/announcements/getall"
      );
      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/v1/announcements", {
        title,
        description,
        author,
        expirationDate: expirationDate || null,
      });
      setTitle("");
      setDescription("");
      setAuthor("");
      setExpirationDate("");
      fetchAnnouncements();
    } catch (error) {
      console.error("Error sending announcement:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-poppins">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8">
        <h1 className="text-3xl font-semibold text-blue-500 mb-8">
          Announcements
        </h1>

        {/* Announcement Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6 mb-8"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold"
              htmlFor="title"
            >
              Title:
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold"
              htmlFor="description"
            >
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold"
              htmlFor="author"
            >
              Author:
            </label>
            <input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold"
              htmlFor="expirationDate"
            >
              Expiration Date:
            </label>
            <input
              id="expirationDate"
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send Announcement
          </button>
        </form>

        {/* Announcements List */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Recent Announcements
        </h2>
        <div className="space-y-6">
          {announcements.map((announcement) => (
            <div
              key={announcement._id}
              className={`p-6 bg-white shadow-lg rounded-lg flex justify-between items-center ${
                !announcement.isRead ? "border-l-4 border-indigo-500" : ""
              }`}
            >
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2 font-raleway">
                  {announcement.title}
                </h2>
                <p className="text-gray-700 text-sm font-raleway">
                  {announcement.description}
                </p>
                <p className="text-xs text-gray-500 mt-2 font-raleway">
                  <span className="font-semibold">Author:</span>{" "}
                  {announcement.author}
                </p>
                <p className="text-xs text-gray-500 mt-1 font-raleway">
                  <span className="font-semibold">Expires:</span>{" "}
                  {announcement.expirationDate
                    ? new Date(announcement.expirationDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckAnnouncementSection;
