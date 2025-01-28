import express from "express";
import { getAllAttendance } from "../controllers/attendanceController";
const router = express.Router();
router.get("/getall", getAllAssignments);
router.post("/", createAssignment);
export default router;
