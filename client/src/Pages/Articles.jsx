import React, { useEffect, useState } from "react";
import NavbarArticle from "../components/NavbarArticle";
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../actions/articleAction";
import ArticleCard from "../components/ArticleCard";

const Articles = () => {
  const [category, setCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to handle dropdown visibility
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);

  useEffect(() => {
    if (articles.length === 0) {
      dispatch(getArticles());
    }
  }, [dispatch]);

  return (
    <div>
      <NavbarArticle />
      {/** Show all articles based on the selected category */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Articles;
