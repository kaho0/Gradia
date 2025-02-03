import mongoose from "mongoose";

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  },
  profileImage: {
    type: String,
    default: "https://avatar.iran.liara.run/public/boy",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export const Teacher = mongoose.model("Teacher", teacherSchema);

