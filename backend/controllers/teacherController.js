import { Teacher } from "../models/teacherSchema.js";

// Create a new teacher
export const createTeacher = async (req, res, next) => {
  const { name, age, subject, email, hireDate } = req.body;

  try {
    // Validation
    if (!name || !age || !subject || !email) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields!",
      });
    }

    // Create the teacher
    const newTeacher = await Teacher.create({
      name,
      age,
      subject,
      email,
      hireDate,
    });

    res.status(201).json({
      success: true,
      message: "Teacher created successfully!",
      data: newTeacher,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists!",
      });
    }
    next(err);
  }
};

// Get all teachers
export const getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json({
      success: true,
      data: teachers,
    });
  } catch (err) {
    next(err);
  }
};

// Get a specific teacher by ID
export const getTeacherById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      success: true,
      data: teacher,
    });
  } catch (err) {
    next(err);
  }
};

// Update a teacher's details
export const updateTeacherById = async (req, res, next) => {
  const { id } = req.params;
  const { name, age, subject, email, hireDate } = req.body;

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      { name, age, subject, email, hireDate },
      { new: true, runValidators: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher updated successfully!",
      data: updatedTeacher,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists!",
      });
    }
    next(err);
  }
};

// Delete a teacher
export const deleteTeacherById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(id);

    if (!deletedTeacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};
