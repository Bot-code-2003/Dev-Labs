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
});

export default mongoose.model("Project", projectSchema);
