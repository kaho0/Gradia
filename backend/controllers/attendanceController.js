import Attendance from "../models/attendanceSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createAttendance = async (req, res, next) => {
  let { attendanceData } = req.body;

  try {
    if (!attendanceData) {
      return next(
        handleValidationError("Attendance data is missing or invalid!", 400)
      );
    }

    // If attendanceData is not an array, convert it into one
    if (!Array.isArray(attendanceData)) {
      attendanceData = [attendanceData];
    }

    const attendanceRecords = await Attendance.insertMany(attendanceData);

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
