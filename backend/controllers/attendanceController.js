import Attendance from "../models/attendanceSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createAttendance = async (req, res, next) => {
  const { attendanceData } = req.body;
  try {
    if (
      !attendanceData ||
      !Array.isArray(attendanceData) ||
      attendanceData.length === 0
    ) {
      return next(
        handleValidationError("Attendance data is missing or invalid!", 400)
      );
    }

    const attendanceRecords = [];
    for (const record of attendanceData) {
      try {
        const newAttendance = await Attendance.create(record);
        attendanceRecords.push(newAttendance);
      } catch (error) {
        console.error("Failed to create attendance record:", error);
      }
    }

    res.status(201).json({
      success: true,
      message: "Attendance marked successfully!",
      count: attendanceRecords.length,
      data: attendanceRecords,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllAttendance = async (req, res, next) => {
  try {
    const attendanceRecords = await Attendance.find().populate(
      "student",
      "name registrationNumber grade"
    );

    res.status(200).json({
      success: true,
      count: attendanceRecords.length,
      data: attendanceRecords,
    });
  } catch (err) {
    next(err);
  }
};
