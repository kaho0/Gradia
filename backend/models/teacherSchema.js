import mongoose from "mongoose";

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hireDate: {
    type: Date,
    default: Date.now,
  },
});

export const Teacher = mongoose.model("Teacher", teacherSchema);
