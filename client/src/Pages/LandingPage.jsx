import React, { useState } from "react";
import { Link } from "react-router-dom";
import bg from "../assets/background/bg.svg";

const LandingPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Showcase",
      description: "Display your best projects to the world",
      icon: "🌟",
    },
    {
      title: "Connect",
      description: "Network with talented developers globally",
      icon: "🤝",
    },
    {
      title: "Grow",
      description: "Get feedback and improve your skills",
      icon: "📈",
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col bg-black text-white"
      style={{
        backgroundImage: `url(/bg.svg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header className="py-4 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        <nav className="flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold tracking-tight">
            Dev<span className="text-blue-500">Labs</span>
          </Link>
          <div>
            <Link
              to="/login"
              className="text-lg hover:text-blue-500 transition-colors duration-300 mr-4"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-lg transition-colors duration-300 "
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow flex flex-col md:flex-row items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-8 md:py-12">
        <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Where Code Meets <span className="text-blue-500">Creativity</span>
          </h1>
          <p className="text-lg sm:text-xl mb-6">
            Join a community of innovative developers. Showcase your projects,
            connect with peers, and elevate your coding journey.
          </p>
          <div className="flex justify-center md:justify-start flex-wrap gap-4">
            <Link
              to="/signup"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 text-lg font-semibold transition-colors duration-300 "
            >
              Get Started
            </Link>
            <Link
              to="/explore"
              className="border border-white hover:bg-white hover:text-blue-900 px-6 py-3 text-lg font-semibold transition-colors duration-300 "
            >
              Explore Projects
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md p-4 md:p-8 bg-white bg-opacity-10  backdrop-filter backdrop-blur-lg">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-4 cursor-pointer transition-all duration-300  mb-4 ${
                  activeFeature === index
                    ? "bg-blue-500 bg-opacity-50"
                    : "hover:bg-white hover:bg-opacity-10"
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <h3 className="text-2xl font-semibold mb-2">
                  <span className="mr-2">{feature.icon}</span>
                  {feature.title}
                </h3>
                <p className="text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="py-6 px-4 sm:px-6 lg:px-8 xl:px-24 text-center text-sm md:text-base">
        <p className="mb-4">
          Join a growing community of developers and be a part of something
          great on DevLabs
        </p>

        <div className="flex justify-center space-x-6 text-sm mb-4">
          <Link
            to="/about"
            className="hover:text-blue-500 transition-colors duration-300"
          >
            About
          </Link>
          <Link
            to="/terms"
            className="hover:text-blue-500 transition-colors duration-300"
          >
            Terms
          </Link>
          <Link
            to="/privacy"
            className="hover:text-blue-500 transition-colors duration-300"
          >
            Privacy
          </Link>
          <Link
            to="/contact"
            className="hover:text-blue-500 transition-colors duration-300"
          >
            Contact
          </Link>
        </div>
        <p className="text-sm opacity-75">
          © {new Date().getFullYear()} DevLabs. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
