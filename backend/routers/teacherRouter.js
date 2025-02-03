import express from "express";
import {
  createTeacher,
  getAllTeachers,
  updateTeacherById,
} from "../controllers/teacherController.js";
const router = express.Router();
router.get("/getall", getAllTeachers);
router.post("/", createTeacher);
router.put("/:id", updateTeacherById);
export default router;
