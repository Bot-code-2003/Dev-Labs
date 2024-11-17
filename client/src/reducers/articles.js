const initialState = {
  articles: [],
  clickedArticle: {},
  loading: false, // Add loading state here if not already defined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT_VIEWS":
      return {
        ...state,
        articles: state.articles.map((article) =>
          article.slug === action.payload
            ? { ...article, views: article.views + 1 }
            : article
        ),
      };
    case "GET_ARTICLE":
      return {
        ...state,
        clickedArticle: action.payload,
        loading: false, // Set loading to false after fetching
      };

    case "GET_ARTICLES":
      return {
        ...state,
        articles: action.payload,
      };

    default:
      return state;
  }
};
