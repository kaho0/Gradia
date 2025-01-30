import { Student } from "../models/studentSchema.js";

export const createStudent = async (req, res) => {
  try {
    const {
      name,
      registrationNumber,
      grade,
      age,
      gender,
      email,
      profileImage,
    } = req.body;

    if (!name || !registrationNumber || !grade || !age || !gender || !email) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const existingStudent = await Student.findOne({ registrationNumber });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Registration Number already exists",
      });
    }

    const student = new Student({
      name,
      registrationNumber,
      grade,
      age,
      gender,
      email,
      profileImage,
    });

    await student.save();
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student,
    });
  } catch (err) {
    console.error("Error creating student:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// ✅ Export getAllStudents properly
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ success: true, students });
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
