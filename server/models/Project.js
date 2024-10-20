import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: String,
  projectDescription: String,
  projectURL: String,
  githubURL: String,
  projectThumbnail: String,
  projectImages: [String],
  techStack: String,
  author: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User schema
    ref: "User",
    required: true,
  },
  projectLikes: {
    type: [String],
    default: [],
  },
  projectViews: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Project", projectSchema);
