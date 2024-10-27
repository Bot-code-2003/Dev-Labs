import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  IconButton,
  Avatar,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Science as ScienceIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
  ArrowDropDown as ArrowDropDownIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import Nebula from "../assets/nebula.jpeg";
import Search from "./Search";
import { getProjects } from "../actions/project";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for filter
  const [selectedFilter, setSelectedFilter] = useState("most recent");
  const dropdownRef = useRef(null);
  const desktopFilterRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.email) setLoggedIn(true);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        desktopFilterRef.current &&
        !desktopFilterRef.current.contains(event.target)
      ) {
        setFilterDropdownOpen(false);
      }
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
    window.location.href = "/thankyou";
  };

  const ITEMS_PER_PAGE = 24;

  // Handle filter selection and update state
  const handleMenuItemClick = async (filterOption) => {
    setSelectedFilter(filterOption);
    setFilterDropdownOpen(false);
    setMobileFilterOpen(false);
    setLoading(true); // Start loading animation

    // Dispatch the getProjects action based on the selected filter
    await dispatch(getProjects(1, ITEMS_PER_PAGE, filterOption.toLowerCase()));

    setLoading(false); // Stop loading animation
  };

  useEffect(() => {
    if (selectedFilter) {
      dispatch(getProjects(1, ITEMS_PER_PAGE, selectedFilter.toLowerCase()));
      setDrawerOpen(false);
    }
  }, [selectedFilter, dispatch]);

  const menuItems = [{ text: "Explore", link: "/explore" }];
  const loggedInUser = JSON.parse(localStorage.getItem("user")) || {};
  const loggedInUserName = loggedInUser?.username || "User";
  const loggedInProfileImage = loggedInUser?.profileImage;

  return (
    <div>
      {/* Desktop Navbar */}
      <nav className="flex justify-between items-center p-4 border-b border-gray-300">
        <div className="flex items-center">
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
            <div className="absolute inset-0 bg-black bg-opacity-40 "></div>
            <p className="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold z-10">
              Dev Labs
            </p>
          </div>

          <div className="hidden sm:flex space-x-6">
            {menuItems.map((item) => (
              <Link
                to={item.link}
                key={item.text}
                className={`text-gray-700 py-3 px-4 border text-center hover:border-black ${
                  location.pathname === item.link ? "bg-gray-200" : ""
                }`}
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>

        <Search isMobile={false} />

        <div className="flex sm:hidden">
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon className="text-gray-800" fontSize="large" />
          </IconButton>
        </div>

        <div className="hidden sm:flex space-x-4">
          <div className="relative" ref={desktopFilterRef}>
            <button
              onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
              className="bg-gray-100 border flex items-center gap-1 hover:bg-gray-200 px-4 py-3"
            >
              {loading ? ( // Show loading spinner if loading
                <CircularProgress size={20} className="mr-2" />
              ) : (
                <FilterListIcon className="mr-2" />
              )}
              Filter
              <ArrowDropDownIcon />
            </button>
            {filterDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg py-1 z-10">
                <MenuItem onClick={() => handleMenuItemClick("Most Liked")}>
                  Most Liked
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("Most Viewed")}>
                  Most Viewed
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("Most Recent")}>
                  Most Recent
                </MenuItem>
              </div>
            )}
          </div>
          {loggedIn ? (
            <div className="flex space-x-4">
              <button
                onClick={() => navigate("/shareproject")}
                className="bg-gray-100 border flex items-center gap-1 hover:bg-gray-200 text-blue-500 px-4 py-2 "
              >
                <ScienceIcon fontSize="small" />
                Share Project
              </button>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="bg-gray-100 border flex items-center gap-1 hover:bg-gray-200 px-4 py-2 "
                >
                  {loggedInProfileImage ? (
                    <img
                      src={loggedInProfileImage}
                      alt={loggedInUserName}
                      className="mr-2 w-8 h-8 rounded-full"
                    />
                  ) : (
                    <AccountCircleIcon className="mr-2" />
                  )}
                  {loggedInUserName}
                  <ArrowDropDownIcon />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg py-1 z-10">
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
                className="bg-gray-100 border flex items-center hover:bg-gray-200 text-blue-500 px-4 py-2 "
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="bg-blue-500 flex items-center hover:bg-blue-700 text-white px-4 py-2 "
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

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
            <Search isMobile={true} />
            {menuItems.map((item) => (
              <Link
                to={item.link}
                key={item.text}
                className={`text-gray-700 py-2 px-4 bg-gray-50 hover:text-gray-500 ${
                  location.pathname === item.link ? "underline" : ""
                }`}
                onClick={toggleDrawer(false)}
              >
                {item.text}
              </Link>
            ))}
            <div className="relative">
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="bg-gray-50 flex items-center gap-1 text-gray-700 px-4 py-2 w-full"
              >
                {loading ? (
                  <CircularProgress size={20} className="mr-2" />
                ) : (
                  <FilterListIcon fontSize="small" />
                )}
                Filter
                <ArrowDropDownIcon />
              </button>
              {mobileFilterOpen && (
                <div className="mt-2 w-full bg-white py-1 z-10">
                  <MenuItem onClick={() => handleMenuItemClick("Most Liked")}>
                    Most Liked
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick("Most Viewed")}>
                    Most Viewed
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick("Most Recent")}>
                    Most Recent
                  </MenuItem>
                </div>
              )}
            </div>
            {loggedIn ? (
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2 px-4 py-2">
                  <Avatar src={loggedInProfileImage} alt={loggedInUserName} />
                  <span>{loggedInUserName}</span>
                </div>
                <Link
                  to="/personalspace"
                  className="text-gray-700 py-2 px-4 bg-gray-50 hover:text-gray-500 "
                  onClick={toggleDrawer(false)}
                >
                  Personal Space
                </Link>
                <button
                  onClick={() => {
                    navigate("/shareproject");
                    setDrawerOpen(false);
                  }}
                  className="bg-gray-50 flex items-center gap-1 text-blue-500 px-4 py-2 w-full"
                >
                  <ScienceIcon fontSize="small" />
                  Share Project
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setDrawerOpen(false);
                  }}
                  className="bg-blue-500 flex items-center gap-1 text-white px-4 py-2 w-full"
                >
                  <LogoutIcon fontSize="small" />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-gray-50 text-blue-500 px-4 py-2 w-full"
                  onClick={toggleDrawer(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 w-full"
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
