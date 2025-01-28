import { Events } from "../models/eventSchema.js";

export const createEvent = async (req, res, next) => {
  const { name, date, location, description } = req.body;

  try {
    // Validation
    if (!name || !date || !location || !description) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields!",
      });
    }

    // Create the event
    const event = await Events.create({ name, date, location, description });
    res.status(201).json({
      success: true,
      message: "Event created successfully!",
      event,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Events.find();
    res.status(200).json({
      success: true,
      events,
    });
  } catch (err) {
    next(err);
  }
};
