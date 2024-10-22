const initialState = {
  reviews: [], // Stores the list of reviews
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_REVIEW":
      return {
        ...state,
        reviews: [action.payload, ...state.reviews],
      };

    case "UPVOTE_REVIEW":
      return {
        ...state,
        reviews: state.reviews.map((review) =>
          review._id === action.payload
            ? { ...review, upvotes: review.upvotes + 1 }
            : review
        ),
      };

    case "REPLY_TO_REVIEW":
      return {
        ...state,
        reviews: state.reviews.map((review) =>
          review._id === action.payload.reviewId
            ? { ...review, replies: [...review.replies, action.payload.reply] }
            : review
        ),
      };

    case "GET_REVIEWS":
      return {
        ...state,
        reviews: action.payload,
      };

    case "DELETE_REVIEW":
      return {
        ...state,
        reviews: state.reviews.filter(
          (review) => review._id !== action.payload
        ),
      };

    case "DELETE_REPLY":
      return {
        ...state,
        reviews: state.reviews.map((review) => {
          if (review._id === action.payload.reviewId) {
            return {
              ...review,
              replies: review.replies.filter(
                (reply) => reply._id !== action.payload.replyId
              ),
            };
          }
          return review;
        }),
      };

    default:
      return state;
  }
};
