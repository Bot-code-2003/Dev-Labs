const initialState = {
  articles: [],
  featuredArticles: [],
  techstories: [],
  techinsights: [],
  foryoungentrepreneurs: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_ARTICLES":
      return {
        ...state,
        articles: action.payload,
      };

    case "GET_FEATURED_ARTICLES":
      return {
        ...state,
        featuredArticles: action.payload,
      };

    case "GET_ARTICLES_BY_CATEGORY":
      return {
        ...state,
        [action.payload.category]: action.payload.articles,
      };
    default:
      return state;
  }
};
