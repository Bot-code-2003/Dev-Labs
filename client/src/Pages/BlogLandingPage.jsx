import React, { useEffect, useState } from "react"; // Importing useState here
import { useDispatch, useSelector } from "react-redux";
import Loading from "../assets/lotties/Animation - 1729259117182.json";
import Lottie from "lottie-react";
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

const ArticleGrid = ({ articles, loading }) => (
  <div>
    {loading ? (
      <div className="flex justify-center items-center h-64">
        <Lottie
          animationData={Loading}
          loop={true}
          style={{ height: 150, width: 150 }}
        />
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
    )}
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
  const { articles, techstories, techinsights, foryoungentrepreneurs } =
    useSelector((state) => state.articles);

  const [isloading, setLoading] = useState(true); // Correct usage of useState inside the component

  useEffect(() => {
    const fetchData = async () => {
      try {
        window.scrollTo(0, 0);
        if (techstories.length === 0) {
          await dispatch(getArticlesByCategory("techstories"));
        }
        if (articles.length === 0) {
          await dispatch(getArticles());
        }
        if (techinsights.length === 0) {
          await dispatch(getArticlesByCategory("techinsights"));
        }
        if (foryoungentrepreneurs.length === 0) {
          await dispatch(getArticlesByCategory("foryoungentrepreneurs"));
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false); // Set loading to false when data fetching is complete
      }
    };

    fetchData();
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
          <ArticleGrid loading={isloading} articles={articles.slice(0, 3)} />
        </section>

        <section className="mb-16">
          <SectionTitle>Tech Stories</SectionTitle>
          <ArticleGrid loading={isloading} articles={techstories.slice(0, 3)} />
        </section>

        <section className="mb-16">
          <SectionTitle>For Young Entrepreneurs</SectionTitle>
          <ArticleGrid
            loading={isloading}
            articles={foryoungentrepreneurs.slice(0, 3)}
          />
        </section>

        <section className="mb-16">
          <SectionTitle>Tech Insights</SectionTitle>
          <ArticleGrid
            loading={isloading}
            articles={techinsights.slice(0, 3)}
          />
        </section>
      </main>
    </div>
  );
}
