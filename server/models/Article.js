import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Author forgot to add the title lol.",
  },
  markdown: {
    type: String,
    default: "",
  },
  slug: {
    type: String,
    default: "",
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: [String],
    default: [],
  },
  randomIndex: {
    type: Number,
    default: 0,
  },
  articleCategory: {
    type: String,
    default: "",
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Article", ArticleSchema);
