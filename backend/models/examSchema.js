import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Exam Schema
const examSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true, // Duration in minutes
  },
  teacher: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
});

export const Exam = mongoose.model("Exam", examSchema);
