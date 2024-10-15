import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: String,
  projectDescription: String,
  projectURL: String,
  githubURL: String,
  projectThumbnail: String,
  projectImages: [String],
  techStack: String,
  author: String,
  authorEmail: String,
  projectLikes: {
    type: Number,
    default: 0,
  },
  projectViews: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Project", projectSchema);
