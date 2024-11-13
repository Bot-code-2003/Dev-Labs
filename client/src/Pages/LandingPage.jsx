import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Github, Linkedin, Menu, X } from "lucide-react";
import Nebula from "../assets/nebula.jpeg";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const features = [
    {
      title: "Showcase Your Work",
      description:
        "Present your projects to a global audience and gain visibility.",
      image: "/landingpage/1.png",
    },
    {
      title: "Connect with Peers",
      description:
        "Collaborate and network with talented developers worldwide.",
      image: "/landingpage/2.png",
    },
    {
      title: "Grow Your Skills",
      description: "Receive constructive feedback and continuously improve.",
      image: "/landingpage/3.png",
    },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen flex flex-col bg-gray-300 text-gray-900">
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: `url(/digestbg.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        className="relative text-white min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-blue-600 to-indigo-800"
      >
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up">
            Welcome to <span className="text-blue-400">Dev Labs</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-300">
            Empowering developers and entrepreneurs to showcase and grow.
          </p>
          <a
            href="/projects"
            className="inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white px-8 py-4 text-lg font-semibold shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up animation-delay-600"
          >
            Start Exploring <ArrowRight className="inline-block ml-2" />
          </a>
        </div>
      </section>

      {/* What is Dev Labs Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-8">
            What is Dev Labs?
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Dev Labs connects developers and creators by showcasing projects in
            a sleek, modern way. Whether you're a novice or experienced
            developer, it’s the perfect platform to showcase your work, receive
            feedback, and engage with a community of like-minded individuals.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-12 text-center">
            Why Choose Dev Labs?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-200 p-8 shadow-md transition-all duration-300 hover:shadow-xl">
              <svg
                className="w-12 h-12 text-blue-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Build, Share, and Grow
              </h3>
              <p className="text-gray-600">
                Showcase your projects, receive feedback, and grow with the help
                of the Dev Labs community.
              </p>
            </div>
            <div className="bg-gray-200 p-8 shadow-md transition-all duration-300 hover:shadow-xl">
              <svg
                className="w-12 h-12 text-green-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Stay Ahead with Insights
              </h3>
              <p className="text-gray-600">
                Learn from expert insights and tips to stay at the forefront of
                web development trends.
              </p>
            </div>
            <div className="bg-gray-200 p-8 shadow-md transition-all duration-300 hover:shadow-xl">
              <svg
                className="w-12 h-12 text-purple-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                A Community That Cares
              </h3>
              <p className="text-gray-600">
                Get the support you need from a community of passionate
                developers and entrepreneurs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl"
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-48 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-blue-700 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-400 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Showcase Your Work?
          </h2>
          <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto">
            Join our platform today and get started with showcasing your
            projects, connecting with others, and advancing your skills.
          </p>
          <a
            href="/signup"
            className="inline-block bg-gray-200 text-blue-700  px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Signup Now <ArrowRight className="inline-block ml-2" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg mb-4">
            Empowering developers and entrepreneurs to thrive in the digital
            world.
          </p>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Dev Labs. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
