import React, { useEffect, useState } from "react"; // Importing useState here
import { useDispatch, useSelector } from "react-redux";
import Loading from "../assets/lotties/Animation - 1729259117182.json";
import Lottie from "lottie-react";
import { getArticles } from "../actions/articleAction";
import ArticleCard from "../components/ArticleCard";
import NavbarArticle from "../components/NavbarArticle";
import { Link } from "react-router-dom";

const SectionTitle = ({ children }) => (
  <h2 className="text-3xl font-bold mb-6 text-white">{children}</h2>
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
      backgroundImage: "url(/blog/alien2.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      backgroundRepeat: "no-repeat",
      backgroundBlendMode: "overlay",
    }}
  >
    <div className="absolute inset-0 bg-black opacity-10 "></div>
    <div className="relative z-10 text-center max-w-3xl mx-auto py-4 px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Welcome to Dev Labs: Beyond the Infinite
      </h1>
      <p className="text-xl mb-8">
        Dev Labs: Beyond the Infinite explores mind-bending paradoxes and the
        vast mysteries of space, where logic and the cosmos collide.
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

const Footer = () => (
  <footer className="bg-gray-800 text-white py-6">
    <div className="container mx-auto text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Dev Labs. All Rights Reserved.
      </p>
      <p className="text-sm mt-2">Built with passion by the Dev Labs Team</p>
    </div>
  </footer>
);

const AboutSection = () => (
  <div
    className="container mx-auto px-4 py-8"
    style={{
      backgroundImage: "url(/blog/about.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      backgroundRepeat: "no-repeat",
      backgroundBlendMode: "overlay",
    }}
  >
    <SectionTitle>About Me</SectionTitle>
    <div className="bg-white p-6 shadow-lg dark:bg-gray-800 dark:text-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-3 flex flex-col justify-between">
          <p className="text-lg mb-4">
            Hi, I'm the owner of Dev Labs, a platform to showcase your
            creativity. I'm deeply passionate about science fiction, which
            inspired me to start this blog on space theories and paradoxes.
            Growing up, I was always fascinated by the wonders of the universe
            and the mysteries surrounding our fate. I spent countless hours
            watching channels like Kurzgesagt in a Nutshell, What If, and
            Destiny. These channels ignited my curiosity about the forces that
            shape our lives and how the universe itself is the ultimate deciding
            factor in our journey.
          </p>
          <p className="text-lg">
            Through this blog, I hope to explore these profound ideas and engage
            with like-minded individuals who share the same curiosity about
            space and the mind-bending paradoxes that come with it.
          </p>
        </div>
        <div className="md:col-span-1 flex justify-center items-stretch">
          {" "}
          {/* Ensure image stretches to match content height */}
          <img
            className="w-full max-h-56 object-cover object-top shadow-lg" // Ensure image fills the height of the parent
            src="https://honeywell.scene7.com/is/image/honeywell/AeroBT-Astronaut-on-a-bench_2880x1440:1-1-square?wid=1245&hei=1245&dpr=off" // Replace with your actual image path
            alt="Your Image"
          />
        </div>
      </div>
    </div>
  </div>
);

export default function BlogLandingPage() {
  const dispatch = useDispatch();
  const { articles } = useSelector((state) => state.articles);

  const [isloading, setLoading] = useState(true); // Correct usage of useState inside the component

  useEffect(() => {
    const fetchData = async () => {
      try {
        window.scrollTo(0, 0);
        if (articles.length === 0) {
          await dispatch(getArticles());
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
    <div className="bg-gray-100 dark:bg-gray-900">
      <div className="mb-4">
        <NavbarArticle />
      </div>
      <div className="container mx-auto px-4 py-4">
        <HeroSection />
      </div>
      <main className="container mx-auto px-4 py-6">
        <SectionTitle>Latest Articles</SectionTitle>
        <ArticleGrid articles={articles} loading={isloading} />
      </main>
      <div className="container mx-auto px-4 py-4">
        <AboutSection /> {/* About section added here */}
      </div>
      <Footer />
    </div>
  );
}
