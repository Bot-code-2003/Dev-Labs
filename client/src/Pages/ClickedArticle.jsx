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

  // Get the clicked article based on the slug
  const article = useSelector((state) =>
    state.articles.articles.find((article) => article.slug === slug)
  );

  // Get the clickedArticle if it exists
  const clickedArticle = useSelector((state) => state.articles.clickedArticle);
  const isLoading = useSelector((state) => state.articles.loading);
  const isCategoryLoading = useSelector(
    (state) => state.articles.categoryLoading
  );

  // Dispatch actions to fetch article data and category data
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!article) {
      dispatch(getArticle(slug)); // Fetch the clicked article
    }
  }, [dispatch, slug, article]);

  useEffect(() => {
    if (clickedArticle && clickedArticle.articleCategory) {
      dispatch(getArticlesByCategoryAll(clickedArticle.articleCategory)); // Fetch related articles by category
    }
  }, [dispatch, clickedArticle]);

  // Use the clickedArticle or fallback to the article fetched by the slug
  const displayArticle = article || clickedArticle;
  const category = displayArticle?.articleCategory;

  // Fetch related articles from the state
  const categoryArticles = useSelector((state) => {
    // First, check if the category is in the state.articles.articles list.
    const filteredArticles = state.articles.articles.filter(
      (article) => article.articleCategory === category
    );

    // If articles are not found, check if the categoryAll (like techstoriesAll) exists.
    if (filteredArticles.length === 0 && category) {
      return state.articles[`${category}All`] || []; // Dynamically access categoryAll.
    }

    // If we have filtered articles, return them.
    return filteredArticles;
  });

  // Log to see if state is updated correctly
  useEffect(() => {
    console.log("The state: ", categoryArticles);
  }, [categoryArticles]);

  // Handle loading states
  if (isLoading || !displayArticle) {
    return <div>Loading article...</div>;
  }

  if (isCategoryLoading || !categoryArticles) {
    return <div>Loading related articles...</div>;
  }

  // Define image based on the randomIndex for the article background
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
      {categoryArticles?.length > 0 && (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-6 underline">
            Related articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {categoryArticles.map(
              (article) =>
                article._id !== displayArticle._id && (
                  <Link
                    key={article._id}
                    to={`/article/${article.slug}`}
                    className="block"
                  >
                    <div
                      style={{
                        backgroundImage: `url(${getImage(
                          article.randomIndex
                        )})`,
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
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClickedArticle;
