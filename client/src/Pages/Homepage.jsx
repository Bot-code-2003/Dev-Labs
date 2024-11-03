// Homepage.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjects,
  clickedProjectAction,
  incProjectView,
} from "../actions/project";
import Lottie from "lottie-react";
import Loading from "../assets/lotties/Animation - 1729259117182.json";
import CircularProgress from "@mui/material/CircularProgress";
import ProjectCard from "../components/ProjectCard"; // Import the new ProjectCard component

const ITEMS_PER_PAGE = 24; // Number of projects to display per page

const Homepage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false); // Loading state

  const projects = useSelector((state) => state.projects.projects); // Get projects in descending order
  // console.log("Projects: ", projects);

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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-3">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onClick={(event) => handleProjectClick(event, project._id)}
            />
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
