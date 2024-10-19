import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const reviewSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "/placeholder.svg?height=40&width=40", // Default profile picture
    },
    time: {
      type: Date,
      default: Date.now,
    },
    review: {
      type: String,
      required: true,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    replies: [replySchema], // Embedding replies schema
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
