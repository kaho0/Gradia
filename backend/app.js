import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import studentRouter from "./routers/studentRouter.js";
import teacherRouter from "./routers/teacherRouter.js";
import assignmentRouter from "./routers/assignmentRouter.js";
import submissionRouter from "./routers/submissionRouter.js"; // <-- Added Submission Router
import announcementRouter from "./routers/announcementRouter.js";
import classRouter from "./routers/classRouter.js";
import libraryRouter from "./routers/libraryRouter.js";
import eventRouter from "./routers/eventRouter.js";
import examRouter from "./routers/examRouter.js";
import attendanceRouter from "./routers/attendanceRouter.js";
import usersRouter from "./routers/usersRouter.js";
import adminRegisterRouter from "./routers/adminRegisterRouter.js";
import ratingRouter from "./routers/ratingRouter.js"; // Rating router
import { errorHandler } from "./middlewares/errorHandler.js";
import morgan from "morgan"; // For better request logging
import helmet from "helmet"; // For security headers
import rateLimit from "express-rate-limit"; // For rate limiting

// Load environment variables
config({ path: "./config/config.env" });

const app = express();

// Connect to the database
dbConnection();

// ✅ Enhanced CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL?.trim() || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 204, // For preflight requests
};

app.use(cors(corsOptions));

// ✅ Security Middleware
app.use(helmet()); // Adds security headers
app.use(express.json({ limit: "10kb" })); // Limit JSON payload size
app.use(express.urlencoded({ extended: true, limit: "10kb" })); // Limit URL-encoded payload size

// ✅ Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// ✅ Enhanced Request Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Logs requests in development mode
} else {
  app.use(morgan("combined")); // More detailed logs in production
}

// ✅ Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

// ✅ Test CORS Route
app.get("/test-cors", (req, res) => {
  res.json({ message: "CORS is working!" });
});

// API Routes
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/assignments", assignmentRouter);
app.use("/api/v1/submissions", submissionRouter); // <-- Added submissions endpoint
app.use("/api/v1/announcements", announcementRouter);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/library", libraryRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/exams", examRouter);
app.use("/api/v1/attendance", attendanceRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/register", adminRegisterRouter);
app.use("/api/v1/ratings", ratingRouter);

// ✅ 404 Route Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handling middleware (should be at the bottom)
app.use(errorHandler);

export default app;
