import { Library } from "../models/librarySchema.js";

// Create a new book in the library
export const createBook = async (req, res, next) => {
  const { name, author, category, status } = req.body;

  try {
    // Validation
    if (!name || !author || !category) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields!",
      });
    }

    // Create the book
    const book = await Library.create({
      name,
      author,
      category,
      status: status || "available", // Default to "available" if not provided
    });
    res.status(201).json({
      success: true,
      message: "Book created successfully!",
      book,
    });
  } catch (err) {
    next(err);
  }
};

// Get all books in the library
export const getAllBooks = async (req, res, next) => {
  try {
    const books = await Library.find();
    res.status(200).json({
      success: true,
      books,
    });
  } catch (err) {
    next(err);
  }
};

// Get a specific book by its ID
export const getBookById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const book = await Library.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      book,
    });
  } catch (err) {
    next(err);
  }
};

// Update a book's details
export const updateBook = async (req, res, next) => {
  const { id } = req.params;
  const { name, author, category, status } = req.body;

  try {
    const book = await Library.findByIdAndUpdate(
      id,
      { name, author, category, status },
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully!",
      book,
    });
  } catch (err) {
    next(err);
  }
};

// Delete a book from the library
export const deleteBook = async (req, res, next) => {
  const { id } = req.params;

  try {
    const book = await Library.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};
