import { Class } from "../models/classSchema.js"; // Ensure the path to your model is correct
import { handleValidationError } from "../middlewares/errorHandler.js";
// Controller to handle class-related operations
export const createClass = async (req, res, next) => {
  const { name, teacher, grade, schedule } = req.body;

  try {
    // Validation
    if (!name || !teacher || !grade || !schedule) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields!",
      });
    }

    // Create the class
    const newClass = await Class.create({
      name,
      teacher,
      grade,
      schedule,
    });

    res.status(201).json({
      success: true,
      message: "Class created successfully!",
      data: newClass,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllClasses = async (req, res, next) => {
  try {
    const classes = await Class.find();
    res.status(200).json({
      success: true,
      data: classes,
    });
  } catch (err) {
    next(err);
  }
};

export const getClassById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const singleClass = await Class.findById(id);
    if (!singleClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    res.status(200).json({
      success: true,
      data: singleClass,
    });
  } catch (err) {
    next(err);
  }
};

export const updateClassById = async (req, res, next) => {
  const { id } = req.params;
  const { name, teacher, grade, schedule } = req.body;

  try {
    const updatedClass = await Class.findByIdAndUpdate(
      id,
      { name, teacher, grade, schedule },
      { new: true, runValidators: true }
    );

    if (!updatedClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Class updated successfully!",
      data: updatedClass,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteClassById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedClass = await Class.findByIdAndDelete(id);

    if (!deletedClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Class deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};
