import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures usernames are unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email is unique
  },
  password: {
    type: String,
    required: true,
  },
  headline: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  profileImage: {
    type: String,
    default: "/placeholder.svg?height=250&width=250", // Default image for users who don't upload one
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
