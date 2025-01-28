import mongoose from "mongoose";

const librarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["available", "borrowed", "reserved"],
    default: "available",
  },
});

export const Library = mongoose.model("Library", librarySchema);
