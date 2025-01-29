import express from "express";
import {
  createTeacher,
  getAllTeachers,
} from "../controllers/teacherController.js";
const router = express.Router();
router.get("/getall", getAllTeachers);
router.post("/", createTeacher);
export default router;
