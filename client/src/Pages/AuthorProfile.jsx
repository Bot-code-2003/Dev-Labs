import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../actions/user";
import {
  getAuthorProjects,
  clickedProjectAction,
  incProjectView,
} from "../actions/project";
import ProjectCard from "../components/ProjectCard"; // Import the ProjectCard component
import loadingAnimation from "../assets/lotties/Animation - 1729259117182.json";
import Lottie from "lottie-react";

const AuthorProfile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const { authorId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const author = useSelector((state) => state.users.authorInfo);
  const authorProjects = useSelector((state) => state.projects.authorProjects);

  useEffect(() => {
    if (authorId) {
      dispatch(getUserInfo(authorId));
      dispatch(getAuthorProjects(authorId)).finally(() => setLoading(false));
    }
  }, [authorId, dispatch]);

  const handleProjectClick = (event, projectId) => {
    event.preventDefault();
    const clickedProject = authorProjects.find(
      (project) => project._id === projectId
    );
    dispatch(incProjectView(projectId));
    dispatch(clickedProjectAction(clickedProject));
    navigate(`/project/${projectId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200 dark:bg-gray-800">
        {/* <CircularProgress /> */}
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    );
  }

  const formatDescription = (description) => {
    return description?.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-200 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="shadow-xl overflow-hidden bg-gray-100 dark:bg-gray-600">
          <div className="md:flex">
            <div className="md:flex-shrink-0 p-6 bg-gradient-to-br from-blue-400 to-indigo-400">
              <div className="relative flex justify-center items-center w-48 h-48 mx-auto md:w-40 md:h-40">
                <img
                  src={
                    author.profileImage ||
                    "/placeholder.svg?height=250&width=250"
                  }
                  className="w-full h-full object-cover border-4 border-white shadow-inner transition-transform duration-300 hover:scale-105"
                  alt="Author Profile"
                />
              </div>
            </div>
            <div className="p-4 sm:p-8 md:flex-grow">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h1 className="text-3xl font-bold mb-2 md:mb-0 text-gray-900 dark:text-white">
                  {author.username}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {author.email}
                </p>
              </div>
              <p className="text-xl italic mb-4 text-gray-700 dark:text-gray-300">
                {author.headline || "No headline available"}
              </p>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                {formatDescription(author.bio) || "No bio available"}
              </p>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="shadow-xl p-4 sm:p-6 bg-gray-100 dark:bg-gray-600">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            {author.username}'s Projects
          </h2>
          {authorProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {authorProjects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  onClick={(event) => handleProjectClick(event, project._id)}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              No projects available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
