import express, { urlencoded } from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Get MongoDB URL from environment variables
const url = process.env.MONGODB_URL;

// Middleware to handle JSON and URL-encoded data
app.use(express.json({ limit: "30mb", extended: true }));
app.use(urlencoded({ limit: "30mb", extended: true }));

// Use CORS middleware
app.use(cors({ origin: "https://dev-labs.vercel.app" }));

// Define routes
app.use("/user", userRoutes);
app.use("/project", projectRoutes);
app.use("/review", reviewRoutes);
app.use("/article", articleRoutes);

// Serve index.html for root route
app.get("/", (req, res) => {
  res.send("Welcome to Dev Labs Server");
});

// Connect to MongoDB and start the server
mongoose
  // .connect("mongodb://localhost:27017/Dev-labs", {
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(5000, () =>
      console.log("Database connected. Server running on port 5000")
    )
  )
  .catch((err) => console.log(err));

/* This is a test comment */
