import axios from "axios";

// Set the base URL for the API
const API = axios.create({ baseURL: "http://localhost:5000" });

// Add Review
export const addReview =
  (reviewData, projectId, authorId) => async (dispatch) => {
    try {
      const { data } = await API.post(`/review/${projectId}`, {
        reviewData,
        authorId,
      });
      dispatch({ type: "ADD_REVIEW", payload: data });
    } catch (error) {
      console.error("Error adding review:", error.message);
    }
  };

// Upvote Review
export const upvoteReview = (reviewId) => async (dispatch) => {
  try {
    dispatch({ type: "UPVOTE_REVIEW", payload: reviewId });
    await API.patch(`/review/${reviewId}/upvote`);
  } catch (error) {
    console.error("Error upvoting review:", error.message);
  }
};

// Reply to Review
export const replyToReview = (reviewId, replyData) => async (dispatch) => {
  try {
    const { data } = await API.post(`/review/${reviewId}/reply`, replyData);
    dispatch({ type: "REPLY_TO_REVIEW", payload: { reviewId, reply: data } });
  } catch (error) {
    console.error("Error replying to review:", error.message);
  }
};

// Get Reviews
export const getReviews = (projectId) => async (dispatch) => {
  try {
    const { data } = await API.get(`/review/${projectId}`);
    dispatch({ type: "GET_REVIEWS", payload: data });
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
  }
};

// Delete Review
export const deleteReview = (reviewId) => async (dispatch) => {
  try {
    await API.delete(`/review/${reviewId}`);
    dispatch({ type: "DELETE_REVIEW", payload: reviewId });
  } catch (error) {
    console.error("Error deleting review:", error.message);
  }
};

// Delete Reply (if you implement this functionality)
export const deleteReply = (reviewId, replyId) => async (dispatch) => {
  try {
    await API.delete(`/review/${reviewId}/reply/${replyId}`);
    dispatch({ type: "DELETE_REPLY", payload: { reviewId, replyId } });
  } catch (error) {
    console.error("Error deleting reply:", error.message);
  }
};
