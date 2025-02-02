import Rating from "../models/ratingSchema.js";

export const createRating = async (req, res) => {
  try {
    const { teacher, rating, comment, studentName } = req.body;

    if (!teacher || !rating || !comment || !studentName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRating = new Rating({
      teacher,
      rating: Number(rating),
      comment,
      studentName,
    });

    await newRating.save();
    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRatings = async (req, res) => {
  try {
    const ratings = await Rating.find().sort({ createdAt: -1 });
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
