import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: String,
  description: String,
  link: String,
  thumbnail: String,
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
