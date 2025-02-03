import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  course: { type: String, required: true },
  month: { type: String, required: true },
  status: {
    type: String,
    enum: ["Present", "Absent", "Absent with apology"],
    required: true,
  },
  student: { type: String, required: true },
});

export default mongoose.model("Attendance", attendanceSchema);
