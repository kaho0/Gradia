import express from "express";
import {
  createAnnouncement,
  getAllAnnouncements,
} from "../controllers/announcementController.js";
const router = express.Router();
router.get("/getall", getAllAnnouncements);
router.post("/", createAnnouncement);
export default router;
