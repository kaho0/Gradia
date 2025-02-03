import Attendance from "../models/attendanceSchema.js";

// Create attendance
export const createAttendance = async (req, res, next) => {
  try {
    const { attendanceData } = req.body;

    if (!attendanceData) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    const attendanceRecords = await Attendance.insertMany(attendanceData);
    res.status(201).json({
      success: true,
      message: "Attendance marked successfully!",
      data: attendanceRecords,
    });
  } catch (err) {
    next(err);
  }
};

// Get all attendance
export const getAllAttendance = async (req, res, next) => {
  try {
    const attendanceRecords = await Attendance.find();
    res.status(200).json({ success: true, data: attendanceRecords });
  } catch (err) {
    next(err);
  }
};
