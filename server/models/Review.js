import mongoose from "mongoose";

// Define the schema for replies
const replySchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Define the schema for reviews
const reviewSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    replies: [replySchema],
  },
  { timestamps: true }
);

// Create the Review model
const Review = mongoose.model("Review", reviewSchema);

export default Review;
