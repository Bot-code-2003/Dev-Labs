"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getArticles,
  getFeaturedArticles,
  getArticlesByCategory,
} from "../actions/articleAction";
import ArticleCard from "../components/ArticleCard";
import NavbarArticle from "../components/NavbarArticle";
import { Link } from "react-router-dom";

const SectionTitle = ({ children }) => (
  <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
    {children}
  </h2>
);

const ArticleGrid = ({ articles }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {articles.map((article) => (
      <ArticleCard key={article._id} article={article} />
    ))}
  </div>
);

const HeroSection = () => (
  <div
    className="relative bg-cover bg-center bg-no-repeat h-[60vh] flex items-center justify-center text-white"
    style={{
      backgroundImage: "url(/digestbg.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      backgroundRepeat: "no-repeat",
      backgroundBlendMode: "overlay",
      // backgroundColor: "rgba(0, 0, 0, 0.5)",
    }}
  >
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Welcome to Dev Labs Digest
      </h1>
      <p className="text-xl mb-8">
        Curated content, expert advice, and tech stories to inspire and empower
        developers and entrepreneurs in a fast-paced digital world.
      </p>
      <Link
        to="/articles"
        className="inline-block bg-white text-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:bg-blue-600 hover:text-white"
      >
        Explore Articles
      </Link>
    </div>
  </div>
);

export default function BlogLandingPage() {
  const dispatch = useDispatch();
  const {
    articles,
    featuredArticles,
    techstories,
    techinsights,
    foryoungentrepreneurs,
  } = useSelector((state) => state.articles);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getArticles());
    dispatch(getFeaturedArticles());
    dispatch(getArticlesByCategory("techstories"));
    dispatch(getArticlesByCategory("techinsights"));
    dispatch(getArticlesByCategory("foryoungentrepreneurs"));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="mb-4">
        <NavbarArticle />
      </div>
      <div className="container mx-auto px-4 py-4">
        <HeroSection />
      </div>

      <main className="container mx-auto px-4 py-6">
        <section className="mb-16">
          <SectionTitle>Recent Articles</SectionTitle>
          <ArticleGrid articles={articles.slice(0, 3)} />
        </section>

        <section className="mb-16">
          <SectionTitle>Tech Stories</SectionTitle>
          <ArticleGrid articles={techstories.slice(0, 3)} />
        </section>

        <section className="mb-16">
          <SectionTitle>For Young Entrepreneurs</SectionTitle>
          <ArticleGrid articles={foryoungentrepreneurs.slice(0, 3)} />
        </section>

        <section className="mb-16">
          <SectionTitle>Tech Insights</SectionTitle>
          <ArticleGrid articles={techinsights.slice(0, 3)} />
        </section>
      </main>
    </div>
  );
}
