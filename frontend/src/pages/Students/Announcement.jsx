import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { MdDone, MdError } from "react-icons/md";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AnnouncementSection = () => {
  const [announcements, setAnnouncements] = useState([]);
  const MySwal = withReactContent(Swal);

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
              <div className="flex items-center">
                {announcement.isRead ? (
                  <span className="text-green-500 font-medium flex items-center font-ranch">
                    <MdDone className="mr-1" /> Read
                  </span>
                ) : (
                  <span className="text-yellow-500 font-medium flex items-center font-ranch">
                    <MdError className="mr-1" /> Unread
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementSection;
