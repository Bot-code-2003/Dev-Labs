import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Drawer, IconButton, Avatar, MenuItem, Button } from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  Science as ScienceIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";
import Filter from "./Filter";
import Nebula from "../assets/nebula.jpeg";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.email) setLoggedIn(true);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
    navigate("/login");
  };

  const menuItems = [{ text: "Explore", link: "/" }];
  const loggedInUser = JSON.parse(localStorage.getItem("user")) || {};
  const {
    email: loggedInUserEmail,
    name: loggedInUserName,
    authorImage: loggedInUserProfile,
  } = loggedInUser;

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
              Dev Labs
            </p>
          </div>

          <div className="hidden sm:flex space-x-6">
            {menuItems.map((item) => (
              <Link
                to={item.link}
                key={item.text}
                className={`text-gray-700 py-2 px-4 rounded-full border text-center hover:border-black ${
                  location.pathname === item.link ? "bg-gray-200" : ""
                }`}
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex sm:hidden">
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </div>

        <div className="hidden sm:flex space-x-4">
          {loggedIn ? (
            <div className="flex space-x-4">
              <Button
                onClick={() => navigate("/shareproject")}
                className="bg-gray-100 border flex items-center gap-1 hover:bg-gray-200 text-blue-500 px-4 py-2 rounded-full"
              >
                <ScienceIcon fontSize="small" />
                Share Project
              </Button>
              <div className="relative" ref={dropdownRef}>
                <Button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="bg-gray-100 border flex items-center gap-1 hover:bg-gray-200 px-4 py-2 rounded-full"
                >
                  {loggedInUserProfile ? (
                    <img
                      src={loggedInUserProfile}
                      alt={loggedInUserName}
                      className="mr-2 w-8 h-8 rounded-full"
                    />
                  ) : (
                    <AccountCircleIcon className="mr-2" />
                  )}
                  {loggedInUserName}
                  <ArrowDropDownIcon />
                </Button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <MenuItem
                      onClick={() => (
                        navigate("/personalspace"), setDropdownOpen(false)
                      )}
                    >
                      Personal Space
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </div>
                )}
              </div>
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
            <p className="text-lg font-bold">Dev Labs</p>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <Link
                to={item.link}
                key={item.text}
                className={`text-gray-700 py-2 px-4 bg-gray-50 hover:text-gray-500 rounded-full ${
                  location.pathname === item.link ? "underline" : ""
                }`}
                onClick={toggleDrawer(false)}
              >
                {item.text}
              </Link>
            ))}
            {loggedIn ? (
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2 px-4 py-2">
                  <Avatar src={loggedInUserProfile} alt={loggedInUserName} />
                  <span>{loggedInUserName}</span>
                </div>
                <Link
                  to="/personalspace"
                  className="text-gray-700 py-2 px-4 bg-gray-50 hover:text-gray-500 rounded-full"
                  onClick={toggleDrawer(false)}
                >
                  Personal Space
                </Link>
                <Button
                  onClick={() => {
                    navigate("/shareproject");
                    setDrawerOpen(false);
                  }}
                  className="bg-gray-50 flex items-center gap-1 text-blue-500 px-4 py-2 rounded-full w-full"
                >
                  <ScienceIcon fontSize="small" />
                  Share Project
                </Button>
                <Button
                  onClick={() => {
                    handleLogout();
                    setDrawerOpen(false);
                  }}
                  className="bg-blue-500 flex items-center gap-1 text-white px-4 py-2 rounded-full w-full"
                >
                  <LogoutIcon fontSize="small" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-gray-50 text-blue-500 px-4 py-2 rounded-full w-full"
                  onClick={toggleDrawer(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full w-full"
                  onClick={toggleDrawer(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
