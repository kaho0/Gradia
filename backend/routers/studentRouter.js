import express from "express";
import {
  createStudent,
  getAllStudents,
} from "../controllers/studentController.js";
const router = express.Router();
router.get("/getall", getAllStudents);
router.post("/", createStudent);
export default router;
