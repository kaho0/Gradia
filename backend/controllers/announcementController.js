import { Announcement } from "../models/announcementSchema.js";

// Create a new announcement
export const createAnnouncement = async (req, res, next) => {
  const { title, description, author, expirationDate } = req.body;

  try {
    // Validate required fields
    if (!title || !description || !author) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, description, and author!",
      });
    }

    // Create the announcement
    const announcement = await Announcement.create({
      title,
      description,
      author,
      expirationDate,
    });

    res.status(201).json({
      success: true,
      message: "Announcement created successfully!",
      announcement,
    });
  } catch (err) {
    next(err);
  }
};

// Get all announcements
export const getAllAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json({
      success: true,
      announcements,
    });
  } catch (err) {
    next(err);
  }
};

// Get a single announcement by ID
export const getAnnouncementById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const announcement = await Announcement.findById(id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found!",
      });
    }

    res.status(200).json({
      success: true,
      announcement,
    });
  } catch (err) {
    next(err);
  }
};

// Update an announcement
export const updateAnnouncement = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, author, expirationDate } = req.body;

  try {
    const announcement = await Announcement.findByIdAndUpdate(
      id,
      { title, description, author, expirationDate },
      { new: true, runValidators: true }
    );

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Announcement updated successfully!",
      announcement,
    });
  } catch (err) {
    next(err);
  }
};

// Delete an announcement
export const deleteAnnouncement = async (req, res, next) => {
  const { id } = req.params;

  try {
    const announcement = await Announcement.findByIdAndDelete(id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Announcement deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};
