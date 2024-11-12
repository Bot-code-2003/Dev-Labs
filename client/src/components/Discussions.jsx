import React, { useState, useEffect } from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import { useSelector, useDispatch } from "react-redux";
import {
  addReview,
  replyToReview,
  getReviews,
  deleteReview,
  deleteReply,
} from "../actions/review";

export default function Discussions({ projectId }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews) || [];

  const [newReview, setNewReview] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = loggedInUser?.userId;

  useEffect(() => {
    dispatch(getReviews(projectId));
  }, [dispatch, projectId]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.trim() === "") return;
    dispatch(addReview(newReview, projectId, loggedInUserId));
    setNewReview("");
  };

  const submitReply = (reviewId) => {
    if (!loggedInUser) {
      alert("Please login to add a reply");
      return;
    }
    if (replyText.trim() === "") {
      alert("Reply cannot be empty");
      return;
    }
    dispatch(
      replyToReview(reviewId, { authorId: loggedInUserId, text: replyText })
    );
    setReplyingTo(null);
    setReplyText("");
  };

  const handleReply = (id) => {
    setReplyingTo(id === replyingTo ? null : id);
    if (id !== replyingTo) setReplyText(""); // Clear the reply text when opening a new reply box
  };

  const handleDeleteReview = (id) => {
    dispatch(deleteReview(id));
  };

  const handleDeleteReply = (reviewId, replyId) => {
    dispatch(deleteReply(reviewId, replyId));
  };

  const formatDescription = (description) => {
    return description.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div className="mx-auto py-4 dark:bg-gray-700">
      <h2 className="text-2xl font-semibold mb-6 dark:text-gray-300">
        User Reviews
      </h2>

      <form
        onSubmit={handleSubmitReview}
        className="mb-4  dark:bg-gray-700 border-b pb-4"
      >
        <label
          htmlFor="newReview"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Your Feedback Matters
        </label>
        <textarea
          id="newReview"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Share your thoughts about the product..."
          className="w-full p-3 mb-3 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-gray-300"
          rows={2}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          Submit Review
        </button>
      </form>

      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white dark:bg-gray-800 px-3 py-1 border-b-2 border-gray-300 dark:border-gray-600"
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={
                    review.authorId.profileImage || loggedInUser?.profileImage
                  }
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                    {review.authorId.username || loggedInUser?.username}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(review.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                {formatDescription(review.review)}
              </p>
              <div className="flex items-center space-x-4 mb-4">
                <button
                  onClick={() => handleReply(review._id)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition duration-150 ease-in-out"
                >
                  <ReplyIcon />
                  <span>Reply</span>
                </button>
                {(review.authorId._id === loggedInUserId ||
                  loggedInUser?.email === "dharmadeepmadisetty@gmail.com") && (
                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
                  >
                    Delete Review
                  </button>
                )}
              </div>

              {replyingTo === review._id && (
                <div className="mt-4">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your reply..."
                    className="w-full p-2 mb-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-gray-300"
                    rows={2}
                  />
                  <button
                    onClick={() => submitReply(review._id)}
                    className="px-3 py-1 bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                  >
                    Submit Reply
                  </button>
                </div>
              )}

              {review.replies && review.replies.length > 0 && (
                <div className="ml-4 sm:ml-8 space-y-4 mt-4 border-l-2 border-gray-200 dark:border-gray-600 pl-4">
                  {review.replies.map((reply) => (
                    <div
                      key={reply._id}
                      className="bg-gray-50 dark:bg-gray-700 p-3"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <img
                          src={
                            reply.authorId.profileImage ||
                            loggedInUser?.profileImage
                          }
                          alt="Profile"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                            {reply.authorId.username || loggedInUser?.username}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(reply.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {formatDescription(reply.text)}
                      </p>
                      {(reply.authorId._id === loggedInUserId ||
                        loggedInUser?.email ===
                          "dharmadeepmadisetty@gmail.com") && (
                        <button
                          onClick={() =>
                            handleDeleteReply(review._id, reply._id)
                          }
                          className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
                        >
                          Delete Reply
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No reviews yet.</p>
      )}
    </div>
  );
}
