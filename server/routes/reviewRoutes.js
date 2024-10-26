import express from "express";
import Review from "../models/Review.js";
import User from "../models/User.js";

const router = express.Router();

// Submit a new review
router.post("/:projectId", async (req, res) => {
  const { projectId } = req.params;
  const { reviewData, authorId } = req.body;

  try {
    const user = await User.findById(authorId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newReview = new Review({
      authorId,
      projectId,
      review: reviewData,
      upvotes: 0,
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get reviews by projectId
router.get("/:projectId", async (req, res) => {
  const { projectId } = req.params;

  try {
    const reviews = await Review.find({ projectId })
      .populate("authorId", "username profileImage") // Populate the review author
      .populate({
        path: "replies.authorId", // Populate the reply author
        select: "username profileImage", // Select the fields to return
      })
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Upvote a review
router.patch("/:id/upvote", async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    review.upvotes += 1;
    const updatedReview = await review.save();
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a reply to a review
router.post("/:id/reply", async (req, res) => {
  const { id } = req.params;
  const { authorId, text } = req.body;

  try {
    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    const reply = { authorId, text };
    review.replies.push(reply);
    const updatedReview = await review.save();
    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a review
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Review.findByIdAndDelete(id);
    res.status(204).send(); // No content
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a reply from a review
router.delete("/:reviewId/reply/:replyId", async (req, res) => {
  const { reviewId, replyId } = req.params;

  try {
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    review.replies = review.replies.filter(
      (reply) => reply._id.toString() !== replyId
    );
    await review.save();
    res.status(204).send(); // No content
  } catch (error) {
    console.error("Error deleting reply:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
