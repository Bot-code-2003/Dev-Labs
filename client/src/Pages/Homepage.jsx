import React, { useState, useEffect, useRef } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Face4Icon from "@mui/icons-material/Face4";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getProjects,
  clickedProjectAction,
  incProjectView,
} from "../actions/project";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Lottie from "lottie-react";
import Loading from "../assets/lotties/Animation - 1729259117182.json";

const Homepage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the projects directly from the Redux store
  const { projects } = useSelector((state) => state.projects);
  console.log("Store projects: ", projects);

  const loggedInUser = JSON.parse(localStorage.getItem("user")); // Parse the stored string into an object
  const loggedInUserEmail = loggedInUser?.email;

  // State to manage which project has the menu open
  const [menuOpen, setMenuOpen] = useState(null);

  // Ref to track the dropdown element
  const menuRef = useRef(null);

  // Fetch projects from backend
  useEffect(() => {
    // Check if projects are already in the Redux store
    if (projects.length === 0) {
      // Fetch the projects from the backend if not already loaded
      dispatch(getProjects());
    }
  }, [dispatch, projects]);

  // Scroll to top on location change
  useEffect(() => {
    scrollTo(0, 0);
  }, [location]);

  // Handle clicks outside of the menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(null); // Close the menu if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleMenuClick = (projectId) => {
    setMenuOpen(menuOpen === projectId ? null : projectId); // Toggle menu visibility
  };

  const handleDelete = (projectId) => {
    console.log(`Delete project with ID: ${projectId}`);
    // Add your delete functionality here
  };

  const handleProjectClick = (event, projectId) => {
    event.preventDefault(); // Prevent the default navigation
    console.log(`Project with ID: ${projectId} clicked`);

    // set the entire project with the id to local storage
    const clickedProject = projects.find(
      (project) => project._id === projectId
    );

    dispatch(incProjectView(projectId));
    dispatch(clickedProjectAction(clickedProject));

    // Navigate programmatically to the project page after setting localStorage
    navigate(`/project/${projectId}`);
  };

  if (projects.length === 0) {
    return (
      <div className="w-full flex justify-center">
        <Lottie
          animationData={Loading}
          className="mt-[100px] sm:mt-0 w-[200px] sm:w-[400px]"
        />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-auto flex-col p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {projects.map((project) => (
          <Link
            to={`/project/${project._id}`}
            onClick={(event) => handleProjectClick(event, project._id)}
            key={project._id}
            className="relative"
          >
            <div className="relative group cursor-pointer">
              {/* Display MoreHorizIcon if the logged-in user is the author */}
              {loggedInUserEmail === project.authorEmail && (
                <div className="absolute top-2 right-2">
                  <MoreHorizIcon
                    className="text-white bg-black bg-opacity-20 hover:bg-opacity-25 rounded cursor-pointer"
                    onClick={() => handleMenuClick(project.id)}
                  />
                  {/* Display the dropdown menu when MoreHorizIcon is clicked */}
                  {menuOpen === project.id && (
                    <div
                      ref={menuRef}
                      className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg z-10"
                    >
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                        onClick={() => handleDelete(project.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Display Project Thumbnail */}
              <img
                src={project.projectThumbnail}
                className="rounded-md w-full h-[300px] sm:h-[315px] md:h-[270px] object-cover mb-2 shadow-sm"
                alt={project.projectName}
              />

              {/* Display Project Name */}
              <h1 className="absolute rounded-md bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent bg-opacity-20 flex items-center justify-center text-xl text-white font-bold font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-1/4">
                {project.projectName}
              </h1>
            </div>

            {/* Author and Optional Info */}
            <div className="flex justify-between p-2">
              {/* Display Author */}
              <a className="text-gray-600 font-bold text-sm flex items-center gap-1">
                {project.authorImage ? (
                  <img
                    src={project.authorImage}
                    className="w-6 h-6 rounded-full"
                    alt={project.author}
                  />
                ) : (
                  <Face4Icon className="text-gray-500" fontSize="small" />
                )}
                {project.author}
              </a>

              {/* Display Likes and Views (Optional) */}
              <div className="flex gap-3">
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <ThumbUpAltIcon className="text-gray-500" fontSize="small" />
                  {project.projectLikes?.length || 0}
                </p>

                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <VisibilityIcon className="text-gray-500" fontSize="small" />
                  {project.projectViews || 0}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
