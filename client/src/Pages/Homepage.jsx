import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjects,
  clickedProjectAction,
  incProjectView,
} from "../actions/project";
import { clearMilestone } from "../actions/user";
import CircularProgress from "@mui/material/CircularProgress";
import ProjectCard from "../components/ProjectCard";
import loadingAnimation from "../assets/lotties/Animation - 1729259117182.json";
import Lottie from "lottie-react";
import MilestoneNotification from "../components/MilestoneNotification ";

const ITEMS_PER_PAGE = 15; // Number of projects per page

const Homepage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true); // Start with loading set to true
  const [showPopup, setShowPopup] = useState(false);

  const projects = useSelector((state) => state.projects.projects);
  const milestone = useSelector((state) => state.users.milestone);
  if (milestone) {
    console.log("milestone in homepage: ", milestone);
  }

  const totalPages = useSelector((state) => state.projects.totalPages);
  const currentPage = useSelector((state) => state.projects.currentPage);

  // Load initial projects
  useEffect(() => {
    dispatch(getProjects(1, ITEMS_PER_PAGE));
  }, [dispatch]);

  useEffect(() => {
    scrollTo(0, 0);
  }, [location]);

  const handleScroll = useCallback(() => {
    const bottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    if (bottom && !loading && currentPage < totalPages) {
      setLoading(true); // Set loading to true before fetching
      setTimeout(() => {
        dispatch(getProjects(currentPage + 1, ITEMS_PER_PAGE));
      }, 2000); // Delay to simulate loading
    }
  }, [currentPage, loading, dispatch, totalPages]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Clear loading state after projects are loaded
  useEffect(() => {
    if (projects.length > 0) setLoading(false);
  }, [projects]);

  const handleProjectClick = (event, projectId) => {
    event.preventDefault();
    const clickedProject = projects.find(
      (project) => project._id === projectId
    );
    dispatch(incProjectView(projectId));
    dispatch(clickedProjectAction(clickedProject));
    navigate(`/project/${projectId}`);
  };

  // Show popup when milestone is achieved
  useEffect(() => {
    if (milestone === "First Project Shared") {
      setShowPopup(true);
    }
  }, [milestone, dispatch]);

  const closePopup = () => {
    dispatch(clearMilestone());
    setShowPopup(false);
  };

  if (projects.length === 0 && loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200 dark:bg-gray-800">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    );
  }

  return (
    <div className="bg-gray-200 dark:bg-gray-800 min-h-screen relative">
      {showPopup && (
        <MilestoneNotification closePopup={closePopup} milestone={milestone} />
      )}

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
            <Lottie animationData={loadingAnimation} loop={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
