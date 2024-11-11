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
      image: "/showcase.jpeg",
    },
    {
      title: "Connect with Peers",
      description:
        "Collaborate and network with talented developers worldwide.",
      image: "/connect.jpg",
    },
    {
      title: "Grow Your Skills",
      description: "Receive constructive feedback and continuously improve.",
      image: "/grow.jpg",
    },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen flex flex-col bg-gray-300 text-gray-900">
      {/* Header */}
      <header className="py-4 px-6 md:px-12 lg:px-4 shadow">
        <nav className="flex justify-between items-center">
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer relative w-40 h-12 mr-4 overflow-hidden group"
          >
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src={Nebula}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                alt="Nebula Labs"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <p className="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold z-10">
              Dev Labs
            </p>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/projects"
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  Explore
                </Link>
                <Link
                  to="/personalspace"
                  className="bg-blue-600 text-white px-4 py-2 shadow transition hover:bg-blue-700"
                >
                  Personal Space
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 shadow transition hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          <button
            className="sm:hidden text-gray-700"
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
          <div className="mt-4 sm:hidden bg-pink p-4 shadow-lg">
            {user ? (
              <>
                <Link
                  to="/projects"
                  className="block py-2 text-blue-600 hover:text-blue-800 transition"
                >
                  Explore
                </Link>
                <Link
                  to="/personalspace"
                  className="block py-2 text-blue-600 hover:text-blue-800 transition"
                >
                  Personal Space
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 text-blue-600 hover:text-blue-800 transition"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="block py-2 text-blue-600 hover:text-blue-800 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        className="relative w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/hero.jpg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Elevate Your Projects
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            Connect, showcase, and grow within a vibrant developer community.
          </p>
          <div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <button className="bg-blue-600 w-full hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold transition">
                  Get Started{" "}
                  <ArrowRight className="ml-2 h-5 w-5 inline-block" />
                </button>
              </Link>
              <Link to="/projects">
                <button className="bg-white w-full hover:bg-blue-600 text-blue-500 hover:text-white px-8 py-3 text-lg font-semibold transition">
                  Explore Projects{" "}
                  <ArrowRight className="ml-2 h-5 w-5 inline-block" />
                </button>
              </Link>
            </div>
            <div className="mt-4 w-full">
              <Link to="/digestlandingpage">
                <button className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 w-full hover:bg-yellow-600 text-white px-8 py-3 text-lg font-semibold transition">
                  Dev Labs Digest{" "}
                  <ArrowRight className="ml-2 h-5 w-5 inline-block" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 md:px-12 lg:px-16 bg-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="shadow-lg overflow-hidden ">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 bg-white">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Discover Section */}
      <section className="bg-blue-600 text-white py-12 px-2 text-center">
        <h2 className="text-2xl font-bold mb-4">Discover More</h2>
        <p className="mb-6">
          Have questions or want to explore more features? We’re here to help!
        </p>
        <div className="flex flex-col px-4 sm:px-0 sm:flex-row gap-2 justify-center w-full">
          <Link to="/contact">
            <button className="bg-white text-blue-600 px-6 py-2 w-full shadow hover:bg-gray-100 transition">
              Contact Us
            </button>
          </Link>
          <Link to="/about">
            <button className="bg-white text-blue-600 px-6 py-2 w-full shadow hover:bg-gray-100 transition">
              About Us
            </button>
          </Link>
          <Link to="/privacy">
            <button className="bg-white text-blue-600 px-6 py-2 w-full shadow hover:bg-gray-100 transition">
              Privacy Policy
            </button>
          </Link>
          <Link to="/digestlandingpage">
            <button className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-white px-6 py-2 w-full shadow hover:bg-yellow-600 transition">
              Dev Labs Digest
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 md:px-12 lg:px-16 bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} DevLabs. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link
              to="https://github.com/Bot-code-2003"
              target="_blank"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 text-gray-400" />
            </Link>
            <Link
              target="_blank"
              to="https://www.linkedin.com/in/dharmadeep-madisetty-oct2003"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-gray-400" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
