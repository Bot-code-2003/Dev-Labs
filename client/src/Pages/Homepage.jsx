import React, { useState, useEffect, useCallback } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Face4Icon from "@mui/icons-material/Face4";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjects,
  clickedProjectAction,
  incProjectView,
} from "../actions/project";
import Lottie from "lottie-react";
import Loading from "../assets/lotties/Animation - 1729259117182.json";
import CircularProgress from "@mui/material/CircularProgress";

const ITEMS_PER_PAGE = 24; // Number of projects to display per page

const Homepage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false); // Loading state

  const projects = useSelector((state) => state.projects.projects); // Get projects in descending order
  console.log("Projects: ", projects);

  const totalPages = useSelector((state) => state.projects.totalPages);
  const currentPage = useSelector((state) => state.projects.currentPage);

  useEffect(() => {
    // Load initial projects
    dispatch(getProjects(1, ITEMS_PER_PAGE));
  }, [dispatch]);

  useEffect(() => {
    scrollTo(0, 0);
  }, [location]);

  const handleScroll = useCallback(() => {
    const bottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500; // Trigger when near the bottom
    if (bottom && !loading && currentPage < totalPages) {
      setLoading(true);
      setTimeout(() => {
        const nextPage = currentPage + 1;
        dispatch(getProjects(nextPage, ITEMS_PER_PAGE));
        setLoading(false); // Set loading to false after loading more projects
      }, 2000); // 2-second delay
    }
  }, [currentPage, loading, dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleProjectClick = (event, projectId) => {
    event.preventDefault();
    const clickedProject = projects.find(
      (project) => project._id === projectId
    );
    dispatch(incProjectView(projectId)); // Increment project views
    dispatch(clickedProjectAction(clickedProject)); // Dispatch the clicked project data
    navigate(`/project/${projectId}`);
  };

  if (projects.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <Lottie animationData={Loading} className="w-[200px] sm:w-[400px]" />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="w-full px-3 sm:px-6 py-6 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {projects.map((project) => (
            <div key={project._id} className="group">
              <p className="text-xs font-semibold text-gray-500 mb-1 uppercase">
                {project.projectType}
              </p>
              <Link
                to={`/project/${project._id}`}
                onClick={(event) => handleProjectClick(event, project._id)}
                className="block relative w-full h-[200px] mb-4 overflow-hidden"
              >
                <img
                  src={project.thumbnail}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  alt={project.projectName}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-300">
                  <h2 className="text-white text-2xl font-bold text-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.projectName}
                  </h2>
                </div>
              </Link>

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {project.authorId?.profileImage ? (
                    <img
                      src={project.authorId.profileImage}
                      className="w-7 h-7 rounded-full"
                      alt={`${project.authorId.username}`}
                    />
                  ) : (
                    <Face4Icon className="text-gray-500 w-10 h-10" />
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {`${project.authorId.username}`}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <ThumbUpAltIcon
                      className="text-gray-500"
                      fontSize="small"
                    />
                    <span className="text-sm text-gray-600">
                      {project.projectLikes.length || 0}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <VisibilityIcon
                      className="text-gray-500"
                      fontSize="small"
                    />
                    <span className="text-sm text-gray-600">
                      {project.projectViews || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
