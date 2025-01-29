import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import studentRouter from "./routers/studentRouter.js";
import teacherRouter from "./routers/teacherRouter.js";
import assignmentRouter from "./routers/assignmentRouter.js";
import announcementRouter from "./routers/announcementRouter.js";
import classRouter from "./routers/classRouter.js";
import libraryRouter from "./routers/libraryRouter.js";
import eventRouter from "./routers/eventRouter.js";
import examRouter from "./routers/examRouter.js";
import attendanceRouter from "./routers/attendanceRouter.js";
import usersRouter from "./routers/usersRouter.js";
import adminRegisterRouter from "./routers/adminRegisterRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";

// Load environment variables
config({ path: "./config/config.env" });

const app = express();

// Connect to the database
dbConnection();

// Enable CORS
app.use(
  cors({
    origin: [process.env.FRONTEND_URL], // Ensure FRONTEND_URL is set in config.env
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debugging log for every request
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url} - ${JSON.stringify(req.body)}`);
  next();
});

// API Routes
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/assignments", assignmentRouter);
app.use("/api/v1/announcements", announcementRouter);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/library", libraryRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/exam", examRouter);
app.use("/api/v1/attendance", attendanceRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/register", adminRegisterRouter);

// Error handling middleware (should be at the bottom)
app.use(errorHandler);

export default app;
