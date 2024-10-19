import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReplyIcon from "@mui/icons-material/Reply";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useSelector, useDispatch } from "react-redux";
import { addReview, upvoteReview, replyToReview } from "../actions/review";

export default function Reviews() {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews) || []; // Adjust path if necessary
  console.log("Reviews: ", reviews); // Debugging line
  const [newReview, setNewReview] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [visibleReviews, setVisibleReviews] = useState(10);
  const [visibleReplies, setVisibleReplies] = useState({});
  const [sortBy, setSortBy] = useState("newest");

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.trim() === "") return;

    dispatch(addReview(newReview));
    setNewReview("");
  };

  const handleUpvote = (id) => {
    dispatch(upvoteReview(id));
  };

  const handleReply = (id) => {
    setReplyingTo(id === replyingTo ? null : id);
    setReplyText("");
  };

  const submitReply = (id) => {
    if (replyText.trim() === "") return;

    dispatch(replyToReview(id, replyText));
    setReplyingTo(null);
    setReplyText("");
  };

  const handleLoadMore = () => {
    setVisibleReviews((prevVisible) => prevVisible + 10);
  };

  const handleLoadMoreReplies = (reviewId) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 5) + 5,
    }));
  };

  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-4">User Reviews</h2>

      <form
        onSubmit={handleSubmitReview}
        className="mb-8 bg-white p-6 rounded-lg shadow-md"
      >
        <label
          htmlFor="newReview"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Write a review
        </label>
        <textarea
          id="newReview"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Share your thoughts about the product..."
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          Submit Review
        </button>
      </form>

      {reviews.length > 0 ? ( // Check if there are reviews
        <div className="space-y-6">
          {reviews.slice(0, visibleReviews).map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <AccountCircleIcon className="h-10 w-10 rounded-full mr-4 text-gray-500" />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {review.author}
                  </h4>
                  <p className="text-sm text-gray-500">{review.time}</p>
                </div>
              </div>
              <p className="mb-4 text-gray-700">{review.review}</p>
              <div className="flex items-center space-x-4 mb-4">
                <button
                  onClick={() => handleUpvote(review.id)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition duration-150 ease-in-out"
                >
                  <ThumbUpIcon fontSize="small" />
                  <span>{review.upvotes}</span>
                </button>
                <button
                  onClick={() => handleReply(review.id)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition duration-150 ease-in-out"
                >
                  <ReplyIcon />
                  <span>Reply</span>
                </button>
              </div>
              {review.replies.length > 0 && (
                <div className="ml-4 sm:ml-8 space-y-4 mt-4 border-l-2 border-gray-200 pl-4">
                  {review.replies
                    .slice(0, visibleReplies[review.id] || 5)
                    .map((reply) => (
                      <div key={reply.id} className="bg-gray-50 p-3 rounded-md">
                        <p className="font-semibold text-gray-700">
                          {reply.author}
                        </p>
                        <p className="text-gray-600">{reply.text}</p>
                      </div>
                    ))}
                  {review.replies.length > (visibleReplies[review.id] || 5) && (
                    <button
                      onClick={() => handleLoadMoreReplies(review.id)}
                      className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
                    >
                      Load More Replies
                    </button>
                  )}
                </div>
              )}
              {replyingTo === review.id && (
                <div className="mt-4">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your reply..."
                    className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={2}
                  />
                  <button
                    onClick={() => submitReply(review.id)}
                    className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                  >
                    Submit Reply
                  </button>
                </div>
              )}
            </div>
          ))}
          {visibleReviews < reviews.length && (
            <div className="mt-8 text-center">
              <button
                onClick={handleLoadMore}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                Load More Reviews
              </button>
            </div>
          )}
        </div>
      ) : (
        // Message when there are no reviews
        <p className="text-gray-500">No reviews yet.</p>
      )}
    </div>
  );
}
