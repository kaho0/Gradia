import express from "express";
import {
  createAttendance,
  getAllAttendance,
} from "../controllers/attendanceController.js";
const router = express.Router();
router.get("/getall", getAllAttendance);
router.post("/", createAttendance);
export default router;
