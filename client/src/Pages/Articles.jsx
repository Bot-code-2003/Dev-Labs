import React, { useEffect, useState } from "react";
import NavbarArticle from "../components/NavbarArticle";
import { useDispatch, useSelector } from "react-redux";
import {
  getArticles,
  getArticlesByCategoryAll,
} from "../actions/articleAction";
import ArticleCard from "../components/ArticleCard";

const Articles = () => {
  const [category, setCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to handle dropdown visibility
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  const techstories = useSelector((state) => state.articles.techstoriesAll);
  const techinsights = useSelector((state) => state.articles.techinsightsAll); // recent first
  const foryoungentrepreneurs = useSelector(
    (state) => state.articles.foryoungentrepreneursAll
  );

  useEffect(() => {
    if (articles.length === 0) {
      dispatch(getArticles());
    }
  }, [dispatch]);

  const handleCategoryClick = (categorya) => () => {
    setCategory(categorya);
    dispatch(getArticlesByCategoryAll(categorya));
    setIsDropdownOpen(false); // Close dropdown after category selection
  };

  return (
    <div>
      <NavbarArticle />
      {/** Category filter for larger screens and mobile */}
      <div className="flex justify-between items-center p-4">
        {/* On larger screens show category buttons */}
        <div className="hidden md:flex gap-4">
          <p
            onClick={() => setCategory("")}
            className="px-3 py-1 border hover:bg-gradient-to-r from-gray-200 via-white to-gray-200 cursor-pointer"
          >
            All
          </p>
          <p
            onClick={handleCategoryClick("techstories")}
            className="px-3 py-1 border hover:bg-gradient-to-r from-gray-200 via-white to-gray-200 cursor-pointer"
          >
            Tech Stories
          </p>
          <p
            onClick={handleCategoryClick("techinsights")}
            className="px-3 py-1 border hover:bg-gradient-to-r from-gray-200 via-white to-gray-200 cursor-pointer"
          >
            Tech Insights
          </p>
          <p
            onClick={handleCategoryClick("foryoungentrepreneurs")}
            className="px-3 py-1 border hover:bg-gradient-to-r from-gray-200 via-white to-gray-200 cursor-pointer"
          >
            For Young Entrepreneurs
          </p>
        </div>

        {/* Mobile Dropdown */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="md:hidden px-3 py-1 border"
        >
          Categories
        </button>

        {/** Dropdown menu for mobile */}
        {isDropdownOpen && (
          <div className="absolute top-14 right-4 w-48 bg-white shadow-lg p-2 z-10 md:hidden">
            <p
              onClick={() => {
                setCategory("");
                setIsDropdownOpen(false);
              }}
              className="px-3 py-1 border hover:bg-gradient-to-r from-gray-200 via-white to-gray-200 cursor-pointer"
            >
              All
            </p>
            <p
              onClick={handleCategoryClick("techstories")}
              className="px-3 py-1 border hover:bg-gradient-to-r from-gray-200 via-white to-gray-200 cursor-pointer"
            >
              Tech Stories
            </p>
            <p
              onClick={handleCategoryClick("techinsights")}
              className="px-3 py-1 border hover:bg-gradient-to-r from-gray-200 via-white to-gray-200 cursor-pointer"
            >
              Tech Insights
            </p>
            <p
              onClick={handleCategoryClick("foryoungentrepreneurs")}
              className="px-3 py-1 border hover:bg-gradient-to-r from-gray-200 via-white to-gray-200 cursor-pointer"
            >
              For Young Entrepreneurs
            </p>
          </div>
        )}
      </div>

      {/** Show all articles based on the selected category */}
      {category === "" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
      {category === "techstories" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {techstories.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
      {category === "foryoungentrepreneurs" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {foryoungentrepreneurs.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
      {category === "techinsights" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {techinsights.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Articles;
