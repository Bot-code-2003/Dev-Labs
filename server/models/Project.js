import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: String,
  projectType: String,
  description: String,
  link: String,
  thumbnail: String,
  tagline: String,
  logo: String,
  images: [String],
  authorId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User schema
    ref: "User",
    required: true,
  },
  projectLikes: {
    type: [String],
    default: [],
  },
  likeCount: {
    // New field to store count of likes
    type: Number,
    default: 0,
  },
  projectViews: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Project", projectSchema);
