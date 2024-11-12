import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getArticles,
  getFeaturedArticles,
  getArticlesByCategory,
} from "../actions/articleAction";
import ArticleCard from "../components/ArticleCard";
import NavbarArticle from "../components/NavbarArticle";

const BlogLandingPage = () => {
  const articles = useSelector((state) => state.articles.articles);
  const featuredArticles = useSelector(
    (state) => state.articles.featuredArticles
  );

  const techstories = useSelector((state) => state.articles.techstories);
  const techinsights = useSelector((state) => state.articles.techinsights);
  const foryoungentrepreneurs = useSelector(
    (state) => state.articles.foryoungentrepreneurs
  );

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getArticles());
    dispatch(getFeaturedArticles());
    dispatch(getArticlesByCategory("techstories"));
    dispatch(getArticlesByCategory("techinsights"));
    dispatch(getArticlesByCategory("foryoungentrepreneurs"));
  }, [dispatch]);

  return (
    <div className="min-h-screen  bg-gray-200 ">
      <NavbarArticle />

      <div className="p-4 sm:p-10">
        {/**Hero section */}
        <div
          style={{
            backgroundImage: `url(/digestbg.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "top", //bottom center
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat",
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
          className="text-center  p-5 text-white"
        >
          <h1 className="text-3xl font-bold mt-8 mb-4 dark:text-gray-200">
            Welcome to Dev Labs Digest
          </h1>
          <p className="text-lg text-gray-300 mb-4">
            Curated content, expert advice, and tech stories to inspire and
            empower developers and entrepreneurs in a fast-paced digital world.
          </p>
          <a
            href="/digest"
            target="_blank"
            className="inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white px-8 py-4 text-lg font-semibold  shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Read More
          </a>
        </div>

        {/**Featured Articles section */}
        <h1 className="text-3xl font-bold mt-8 mb-4 dark:text-gray-200 ">
          Featured Articles
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {featuredArticles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>

        {/**Tech stories*/}
        <h1 className="text-3xl font-bold mt-8 mb-4 dark:text-gray-200">
          Tech Stories
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {techstories.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>

        {/**Tech insights*/}
        <h1 className="text-3xl font-bold mt-8 mb-4 dark:text-gray-200">
          Tech Insights
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {techinsights.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>

        {/**Young Entrepreneurs */}
        <h1 className="text-3xl font-bold mt-8 mb-4 dark:text-gray-200">
          For Young Entrepreneurs
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {foryoungentrepreneurs.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogLandingPage;
