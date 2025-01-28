import mongoose from "mongoose";

const Schema = mongoose.Schema;

const classSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
});

export const Class = mongoose.model("Classes", classSchema);
