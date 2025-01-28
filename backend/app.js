import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import studentRouter from "./routers/studentRouter.js";
import eventRouter from "./routers/eventRoutes.js";
const app = express();
config({ path: "./config/config.env" });

// Add body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/events", eventRouter);
dbConnection();

export default app;
