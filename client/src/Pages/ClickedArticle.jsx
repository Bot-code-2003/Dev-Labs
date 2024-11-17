import React, { useEffect } from "react";
import MarkdownRender from "../components/MarkdownRender";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getArticles } from "../actions/articleAction"; // Assuming you have this action to fetch articles
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const ClickedArticle = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  console.log("slug", slug);

  // Get the list of articles from the Redux store
  const articles = useSelector((state) => state.articles.articles);
  console.log("articles", articles);

  // If articles are not loaded yet, show loading state
  if (!articles) {
    return <div>Loading...</div>;
  }

  // Get the article based on the slug from the URL params
  const article = articles.find((article) => article.slug === slug);
  console.log("article", article);
  // If the article is not found, show a not found message
  if (!article) {
    return <div>Article not found</div>;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-100">
      <div
        onClick={() => window.history.back()}
        className="sm:fixed py-2 px-4 cursor-pointer hover:underline inline-block border-2 border-black mt-2 ml-2"
      >
        <ArrowBackIcon /> Back
      </div>

      <MarkdownRender
        markdownContent={article.markdown}
        title={article.title}
        description={article.description}
        articleHeaderImage={article.articleHeaderImage}
        imageCredit={article.imageCredit}
      />
    </div>
  );
};

export default ClickedArticle;
