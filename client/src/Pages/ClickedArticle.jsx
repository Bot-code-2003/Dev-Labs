import React, { useEffect } from "react";
import MarkdownRender from "../components/MarkdownRender";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getArticle } from "../actions/articleAction";

const ClickedArticle = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();

  // Check if article exists in the list of articles
  const article = useSelector((state) =>
    state.articles.articles.find((article) => article.slug === slug)
  );

  // Get the clickedArticle from the Redux state for cases when the article isn't in the articles array
  const clickedArticle = useSelector((state) => state.articles.clickedArticle);

  // Use loading state to manage loading experience
  const isLoading = useSelector((state) => state.articles.loading);

  useEffect(() => {
    window.scrollTo(0, 0);

    // If article is not found in the list, fetch it
    if (!article) {
      dispatch(getArticle(slug));
    }
  }, [dispatch, slug, article]);

  // Determine which article data to use
  const displayArticle = article || clickedArticle;

  // Render loading state
  if (isLoading || !displayArticle) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100">
      <MarkdownRender
        markdownContent={displayArticle.markdown}
        title={displayArticle.title}
        randomIndex={displayArticle.randomIndex}
      />
    </div>
  );
};

export default ClickedArticle;
