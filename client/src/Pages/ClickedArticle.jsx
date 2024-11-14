import React, { useEffect } from "react";
import MarkdownRender from "../components/MarkdownRender";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getArticle, getArticlesByCategoryAll } from "../actions/articleAction";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const ClickedArticle = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();

  // Check if article exists in the list of articles
  const article = useSelector((state) =>
    state.articles.articles.find((article) => article.slug === slug)
  );

  // If refreshed then this is.
  const clickedArticle = useSelector((state) => state.articles.clickedArticle);

  // Use loading states to manage loading experience
  const isLoading = useSelector((state) => state.articles.loading);
  const isCategoryLoading = useSelector(
    (state) => state.articles.categoryLoading
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!article) {
      dispatch(getArticle(slug)); // this populates the clickedArticle.
    }
  }, [dispatch, slug, article]);

  // Fetch related articles when clickedArticle is populated
  useEffect(() => {
    if (clickedArticle && clickedArticle.articleCategory) {
      console.log("clickedArticle");

      dispatch(getArticlesByCategoryAll(clickedArticle.articleCategory));
    }
  }, [dispatch, clickedArticle]);

  // Determine which article data to use
  const displayArticle = article || clickedArticle;
  const category = displayArticle?.articleCategory;
  console.log("category from either dislayed or article : ", category);

  // Fetch the articles of the same category
  const categoryArticles =
    useSelector((state) =>
      state.articles.articles.filter(
        (article) => article.articleCategory === category
      )
    ) || useSelector((state) => state.articles[`${category}All`]);
  console.log("related : ", categoryArticles);

  // Render loading state
  if (isLoading || !displayArticle) {
    return <div>Loading article...</div>;
  }

  // Show loading for related articles
  if (isCategoryLoading) {
    return <div>Loading related articles...</div>;
  }

  const getImage = (randomIndex) => {
    switch (randomIndex) {
      case 0:
        return "/articlebg/article1.jpg";
      case 1:
        return "/articlebg/article2.png";
      case 2:
        return "/articlebg/article3.png";
      case 3:
        return "/articlebg/article4.png";
      case 4:
        return "/articlebg/article5.webp";
      case 5:
        return "/articlebg/1.png";
      case 6:
        return "/articlebg/2.png";
      case 7:
        return "/articlebg/3.png";
      case 8:
        return "/articlebg/4.png";
      case 9:
        return "/articlebg/5.png";
      case 10:
        return "/articlebg/6.png";
      case 11:
        return "/articlebg/7.png";
      case 12:
        return "/articlebg/8.png";
      default:
        return "/articlebg/1.png";
    }
  };

  return (
    <div className="bg-gray-100">
      <div
        onClick={() => window.history.back()}
        className="sm:fixed py-2 px-4 cursor-pointer hover:underline inline-block border-2 border-black mt-2 ml-2"
      >
        <ArrowBackIcon /> Back
      </div>
      <MarkdownRender
        markdownContent={displayArticle.markdown}
        title={displayArticle.title}
        randomIndex={displayArticle.randomIndex}
      />

      {/** Show related article links of the same category */}
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-6 underline">Related articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categoryArticles.map((article) =>
            article._id !== displayArticle._id ? (
              <Link
                key={article._id}
                to={`/article/${article.slug}`}
                className="block"
              >
                <div
                  style={{
                    backgroundImage: `url(${getImage(article.randomIndex)})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="bg-white p-4 shadow-lg hover:shadow-xl transition duration-300 h-full"
                >
                  <h3 className="text-lg font-semibold text-white hover:text-blue-500 bg-opacity-60 bg-black p-3">
                    {article.title}
                  </h3>
                </div>
              </Link>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default ClickedArticle;
