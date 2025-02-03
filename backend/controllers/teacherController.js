import { Teacher } from "../models/teacherSchema.js";

// Create a new teacher
export const createTeacher = async (req, res, next) => {
  const { name, email, phone, address, qualification, gender, profileImage } = req.body;

  try {
    // Validation
    console.log(req.body);
    if (!name || !email || !phone || !address || !qualification || !gender) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields!",
      });
    }

    // Create the teacher
    const newTeacher = await Teacher.create({
      name,
      email,
      phone,
      address,
      qualification,
      gender,
      profileImage,
    });

    res.status(201).json({
      success: true,
      message: "Teacher profile created successfully!",
      teacher: newTeacher,
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
      teacher: teacher,
    });
  } catch (err) {
    next(err);
  }
};

// Update a teacher's details
export const updateTeacherById = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone, address, qualification, gender, profileImage } = req.body;

  try {
    // Validation
    if (!name || !email || !phone || !address || !qualification || !gender) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields!",
      });
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      { 
        name, 
        email, 
        phone, 
        address, 
        qualification, 
        gender, 
        profileImage 
      },
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
      message: "Teacher profile updated successfully!",
      teacher: updatedTeacher,
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
