import React, { useState, useEffect } from "react";
import Nebula from "../assets/nebula.jpeg";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Filter from "./Filter";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";
import Hero from "./Hero";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [filter, setFilter] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.email) {
      setLoggedIn(true);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
    navigate("/login");
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: "Explore", link: "/" },
    { text: "Web Designs", link: "#" },
    { text: "Web Projects", link: "#" },
    { text: "Arts", link: "#" },
  ];

  return (
    <div>
      {/* Desktop Navbar */}
      <nav className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer relative w-40 h-11 mr-4"
          >
            <img
              src={Nebula}
              className="absolute inset-0 w-full h-full"
              alt="Nebula Labs"
            />
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <p className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold z-10">
              Nebula Labs
            </p>
          </div>

          <div className="hidden sm:flex space-x-6">
            {menuItems.map((item) => (
              <a
                href={item.link}
                key={item.text}
                className={`text-gray-700 py-2 px-4 rounded-full border text-center ${
                  location.pathname === item.link ? "bg-gray-200" : ""
                } ${
                  location.pathname === "/" && item.text === "Explore"
                    ? "bg-gray-200 border-gray-400"
                    : ""
                }`}
              >
                {item.text}
              </a>
            ))}
          </div>
        </div>

        <div className="flex sm:hidden">
          {/* Hamburger Menu */}
          <button className="md:hidden p-4" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </button>
        </div>

        {/* Login/Signup Buttons */}
        <div className="hidden sm:flex space-x-4">
          {loggedIn ? (
            <div className="flex space-x-4">
              <button
                onClick={() => navigate("/shareproject")}
                className="bg-gray-100 border hover:bg-gray-200 text-blue-500 px-4 py-2 rounded-full"
              >
                Share Project
              </button>
              <button
                onClick={handleLogout}
                className="bg-blue-500 text-white px-4 py-2 rounded-full"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-gray-100 border hover:bg-gray-200 text-blue-500 px-4 py-2 rounded-full"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-5 items-center p-4">
        <div className="flex items-center text-center space-x-4 w-full sm:w-1/4">
          <Filter />
        </div>
        <div className="px-4 bg-gray-50 w-full flex items-center border border-gray-300 rounded-full overflow-hidden">
          <SearchIcon className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="px-4 bg-gray-50 py-2 sm:py-3 w-full outline-none"
          />
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div className="p-4 w-64">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-bold">Nebula Labs</p>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center px-4 border border-gray-300 bg-gray-100 rounded-full overflow-hidden">
              <SearchIcon className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="px-2 bg-gray-100 py-2 outline-none"
              />
            </div>
            <Filter />
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  onClick={toggleDrawer(false)}
                  href={item.link}
                  key={item.text}
                  className={`text-gray-700 p-2 bg-gray-50 hover:text-gray-500 ${
                    location.pathname === item.link ? "underline" : ""
                  } ${
                    location.pathname === "/" && item.text === "Explore"
                      ? "underline"
                      : ""
                  }`}
                >
                  {item.text}
                </a>
              ))}
            </div>
            {loggedIn ? (
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => (
                    navigate("/shareproject"), toggleDrawer(false)
                  )}
                  className="bg-gray-50 text-blue-500 px-4 py-2 rounded-full w-full"
                >
                  Share Project
                </button>
                <button
                  onClick={() => (handleLogout, toggleDrawer(false))}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full w-full"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  onClick={toggleDrawer(false)}
                  to="/login"
                  className="bg-gray-50 text-blue-500 px-4 py-2 rounded-full w-full"
                >
                  Log In
                </Link>
                <Link
                  onClick={toggleDrawer(false)}
                  to="/signup"
                  className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full w-full"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </Drawer>
      <div className="sm:block hidden">
        {location.pathname === "/" && !loggedIn && <Hero />}
      </div>
    </div>
  );
};

export default Navbar;
