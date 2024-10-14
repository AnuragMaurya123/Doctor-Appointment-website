import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import doctorRouter from "./routers/doctorRouter.js";
import reviewsRouter from "./routers/reviewRouter.js";
import bookingRouter from "./routers/bookingRouter.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB and Cloudinary
connectDB();
connectCloudinary();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [ 'http://localhost:5199','https://doctor-appointment-website-sable.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

// Test Endpoint
app.get("/", (req, res) => {
  res.send("API is Working");
});

// API Endpoints
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/booking", bookingRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
