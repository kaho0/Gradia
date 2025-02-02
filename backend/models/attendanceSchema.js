import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  student: {
    type: String, // Changed from ObjectId to String
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Absent with apology"],
    required: true,
  },
});

export default mongoose.model("Attendance", attendanceSchema);
