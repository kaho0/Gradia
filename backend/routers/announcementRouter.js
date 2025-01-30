import express from "express";
import {
  createAnnouncement,
  getAllAnnouncements,
  markAsRead,
} from "../controllers/announcementController.js";
const router = express.Router();
router.get("/getall", getAllAnnouncements);
router.post("/", createAnnouncement);
// router.patch("/markasread/:id", markAsRead);
export default router;
