import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Sidebar from "./Sidebar";
import { FaStar, FaUser, FaComment, FaCalendarAlt } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

const TeacherReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [teachers] = useState(["Mr. Smith", "Ms. Johnson", "Dr. Brown"]);
  const [formData, setFormData] = useState({
    teacher: "",
    rating: 0,
    comment: "",
    studentName: "",
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/ratings/getall"
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // SweetAlert2 confirmation
    const result = await Swal.fire({
      title: "Submit Review?",
      text: "Are you sure you want to submit this review?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6d28d9", // Purple color
      cancelButtonColor: "#d33", // Red color
      confirmButtonText: "Yes, submit it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/v1/ratings",
          formData
        );
        setReviews([response.data, ...reviews]); // Add new review to the top
        setFormData({ teacher: "", rating: 0, comment: "", studentName: "" });

        // Success SweetAlert2
        Swal.fire({
          title: "Success!",
          text: "Your review has been submitted.",
          icon: "success",
          confirmButtonColor: "#6d28d9",
        });
      } catch (error) {
        console.error("Error submitting review:", error);

        // Error SweetAlert2
        Swal.fire({
          title: "Error!",
          text: "Failed to submit review. Please try again.",
          icon: "error",
          confirmButtonColor: "#6d28d9",
        });
      }
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-xl ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8">
        <h1 className="text-3xl font-poppins font-semibold text-purple-600 mb-8">
          Teacher Reviews
        </h1>

        {/* Review Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-purple-600 mb-4">
            Submit a Review
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Teacher Select */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Teacher
                </label>
                <select
                  value={formData.teacher}
                  onChange={(e) =>
                    setFormData({ ...formData, teacher: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher} value={teacher}>
                      {teacher}
                    </option>
                  ))}
                </select>
              </div>

              {/* Student Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.studentName}
                  onChange={(e) =>
                    setFormData({ ...formData, studentName: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Rating
              </label>
              <div className="flex space-x-2">
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i + 1}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: i + 1 })}
                    className={`text-2xl ${
                      i < formData.rating ? "text-yellow-400" : "text-gray-300"
                    } hover:text-yellow-500 transition-colors`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Comment
              </label>
              <textarea
                value={formData.comment}
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows="4"
                placeholder="Write your review..."
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div>
          <h2 className="text-2xl font-semibold text-purple-600 mb-6">
            Recent Reviews
          </h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-purple-600">
                      {review.teacher}
                    </h3>
                    <p className="text-gray-600 flex items-center mt-1">
                      <FaUser className="mr-2" />
                      {review.studentName}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-gray-700 mt-4 flex items-center">
                  <FaComment className="mr-2" />
                  {review.comment}
                </p>
                <p className="text-gray-500 text-sm mt-4 flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherReviewSection;
