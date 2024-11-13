import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavbarArticle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bgImage, setBgImage] = useState(""); // To store the random background image

  const toggleMenu = () => setIsOpen(!isOpen);

  const navBgs = [
    "/articlebg/article1.jpg",
    "/articlebg/article2.png",
    "/articlebg/article3.png",
    "/articlebg/article4.png",
    "/articlebg/article5.webp",
    "/articlebg/1.png",
  ];

  // Randomly select a background image on component mount
  useEffect(() => {
    const randomBg = navBgs[Math.floor(Math.random() * navBgs.length)];
    setBgImage(randomBg);
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <nav
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "multiply",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      }}
      className="relative px-4 py-4 md:py-6 shadow-lg"
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-xl md:text-2xl sm:mb-2 font-bold">
            Dev Labs Digest
          </h1>
          <button onClick={toggleMenu} className="text-white md:hidden">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
            <span className="sr-only">
              {isOpen ? "Close Menu" : "Open Menu"}
            </span>
          </button>
        </div>
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:space-x-6 mt-4 md:mt-0 space-y-2 md:space-y-0`}
        >
          <li>
            <Link to="/digest" className="text-white hover:text-blue-300 block">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/articles"
              className="text-white hover:text-blue-300 block"
            >
              Articles
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-white hover:text-blue-300 block"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/"
              // target="_blank"
              className="text-white hover:text-blue-300 block"
            >
              Dev Labs
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarArticle;
