// import express from "express";
// import {
//   createStudent,
//   getAllStudents,
// } from "../controllers/studentController.js";
// const router = express.Router();
// router.get("/getall", getAllStudents);
// router.post("/", createStudent);
// export default router;
import express from "express";
import {
  createStudent,
  getAllStudents,
  updateStudent,
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/getall", getAllStudents);
router.post("/", createStudent);
router.put("/:id", updateStudent); // Add update route

export default router;
