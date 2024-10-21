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

  const { projects } = useSelector((state) => state.projects);
  console.log("Store projects: ", projects);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserEmail = loggedInUser?.email;

  const [menuOpen, setMenuOpen] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(getProjects());
    }
  }, [dispatch, projects]);

  useEffect(() => {
    scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleMenuClick = (projectId) => {
    setMenuOpen(menuOpen === projectId ? null : projectId);
  };

  const handleDelete = (projectId) => {
    console.log(`Delete project with ID: ${projectId}`);
  };

  const handleProjectClick = (event, projectId) => {
    event.preventDefault();
    console.log(`Project with ID: ${projectId} clicked`);

    const clickedProject = projects.find(
      (project) => project._id === projectId
    );

    dispatch(incProjectView(projectId));
    dispatch(clickedProjectAction(clickedProject));

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
      <div className=" w-full px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {projects.map((project) => (
            <div key={project._id} className="group">
              <Link
                to={`/project/${project._id}`}
                onClick={(event) => handleProjectClick(event, project._id)}
                className="block relative w-full h-[200px] mb-4 overflow-hidden rounded-lg"
              >
                <img
                  src={project.projectThumbnail}
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
                  {project.author.authorImage ? (
                    <img
                      src={project.author.authorImage}
                      className="w-7 h-7 rounded-full"
                      alt={`${project.author.firstname} ${project.author.lastname}`}
                    />
                  ) : (
                    <Face4Icon className="text-gray-500 w-10 h-10" />
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {`${project.author.firstname}`}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <ThumbUpAltIcon
                      className="text-gray-500"
                      fontSize="small"
                    />
                    <span className="text-sm text-gray-600">
                      {project.projectLikes?.length || 0}
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
      </div>
    </div>
  );
};

export default Homepage;
