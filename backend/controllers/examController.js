import { Exam } from "../models/examSchema.js";
export const createExam = async (req, res, next) => {
  const { title, subject, date, duration, teacher, grade } = req.body;

  try {
    // Validation
    if (!title || !subject || !date || !duration || !teacher || !grade) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields!",
      });
    }

    // Create the exam
    const newExam = await Exam.create({
      title,
      subject,
      date,
      duration,
      teacher,
      grade,
    });

    res.status(201).json({
      success: true,
      message: "Exam created successfully!",
      data: newExam,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllExams = async (req, res, next) => {
  try {
    const exams = await Exam.find();
    res.status(200).json({
      success: true,
      data: exams,
    });
  } catch (err) {
    next(err);
  }
};

export const getExamById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const exam = await Exam.findById(id);
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    res.status(200).json({
      success: true,
      data: exam,
    });
  } catch (err) {
    next(err);
  }
};

export const updateExamById = async (req, res, next) => {
  const { id } = req.params;
  const { title, subject, date, duration, teacher, grade } = req.body;

  try {
    const updatedExam = await Exam.findByIdAndUpdate(
      id,
      { title, subject, date, duration, teacher, grade },
      { new: true, runValidators: true }
    );

    if (!updatedExam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Exam updated successfully!",
      data: updatedExam,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteExamById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedExam = await Exam.findByIdAndDelete(id);

    if (!deletedExam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Exam deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};
