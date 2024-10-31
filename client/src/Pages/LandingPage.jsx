import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code,
  Users,
  TrendingUp,
  Github,
  Linkedin,
  Twitter,
  Menu,
  X,
} from "lucide-react";

export default function LandingPage() {
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
      title: "Showcase",
      description: "Display your best projects to the world",
      icon: <Code className="w-6 h-6" />,
    },
    {
      title: "Connect",
      description: "Network with talented developers globally",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Grow",
      description: "Get feedback and improve your skills",
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <header className="py-4 px-4 sm:px-6 md:px-12 lg:px-16 bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg">
        <nav className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-bold tracking-tight group"
          >
            Dev<span className="text-blue-400">Labs</span>
          </Link>
          <div className="hidden sm:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/explore"
                  className="text-blue-400 hover:text-blue-500 transition"
                >
                  Explore
                </Link>
                <Link
                  to="/personalspace"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                >
                  Personal Space
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-500 transition"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          <button
            className="sm:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>
        {isMenuOpen && (
          <div className="mt-4 sm:hidden">
            {user ? (
              <>
                <Link
                  to="/explore"
                  className="block py-2 text-blue-400 hover:text-blue-500 transition"
                >
                  Explore
                </Link>
                <Link
                  to="/personalspace"
                  className="block py-2 text-blue-400 hover:text-blue-500 transition"
                >
                  Personal Space
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 text-blue-400 hover:text-blue-500 transition"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="block py-2 text-blue-400 hover:text-blue-500 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 py-12">
        <div className="max-w-4xl w-full text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Showcase Your <span className="text-blue-400">Genius</span>, Inspire
            the <span className="text-blue-400">Future</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-8">
            Join a thriving community of innovative developers. Showcase your
            projects, connect with peers, and elevate your coding journey to new
            heights.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/signup" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition flex items-center justify-center">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
            <Link to="/explore" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto border-2 border-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-full text-lg font-semibold transition">
                Explore Projects
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full max-w-4xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-gray-800 p-4 rounded-lg transition transform hover:scale-105"
              >
                <div className="flex items-center mb-2">
                  {feature.icon}
                  <h3 className="text-xl font-semibold ml-2">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Discover More</h2>
          <p className="mb-4 text-gray-300">
            Have questions or want to learn more about our features? Don't
            hesitate to reach out!
          </p>
          <Link to="/contact">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition">
              Contact Us
            </button>
          </Link>
          <p className="mt-4 text-gray-400">
            or{" "}
            <Link to="/explore" className="text-blue-400 hover:underline">
              explore projects
            </Link>{" "}
            to get inspired!
          </p>
        </div>
      </main>

      <footer className="py-8 px-4 sm:px-6 md:px-12 lg:px-16 bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0 text-sm text-gray-300">
            © {new Date().getFullYear()} DevLabs. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center space-x-4 mb-4 md:mb-0">
            <Link
              to="/about"
              className="text-sm hover:text-blue-400 transition"
            >
              About
            </Link>
            <Link
              to="/privacy"
              className="text-sm hover:text-blue-400 transition"
            >
              Privacy
            </Link>
            <Link
              to="/contact"
              className="text-sm hover:text-blue-400 transition"
            >
              Contact
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link to="#" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Link>
            <Link to="#" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link to="#" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
