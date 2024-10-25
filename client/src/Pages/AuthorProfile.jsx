import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../actions/user";
import {
  getUserProjects,
  clickedProjectAction,
  incProjectView,
} from "../actions/project";

const AuthorProfile = () => {
  const dispatch = useDispatch();
  const { authorId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Get the author information and projects from Redux store
  const author = useSelector((state) => state.users.authorInfo);
  const authorProjects = useSelector((state) => state.projects.userProjects);

  useEffect(() => {
    if (authorId) {
      dispatch(getUserInfo(authorId));
      dispatch(getUserProjects(authorId)).finally(() => setLoading(false));
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
    return <p className="text-center p-10">Loading author profile...</p>;
  }

  // Check if the theme should be dark and scary
  const isDarkTheme = author.email === "vattakaya";

  const darkThemeStyles = {
    backgroundColor: "#0c0c0c",
    color: "#ff0000",
    transition: "background-color 0.5s ease, color 0.5s ease",
    textShadow: "0 0 5px #ff0000, 0 0 10px #ff0000",
  };

  const darkThemeCardStyles = {
    backgroundColor: "#1a0000",
    borderColor: "#ff0000",
    boxShadow: "0 0 10px #ff0000, 0 0 20px #ff0000",
  };

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
        isDarkTheme ? "bg-black text-red-500" : "bg-gray-100"
      }`}
      style={isDarkTheme ? darkThemeStyles : {}}
    >
      <div className="max-w-6xl mx-auto">
        {/* Author Profile Section */}
        <div
          className={`shadow-xl overflow-hidden mb-12 transition-all duration-500 ${
            isDarkTheme ? "bg-gray-900 border-red-500 border-4" : "bg-white"
          }`}
          style={isDarkTheme ? darkThemeCardStyles : {}}
        >
          <div className="md:flex">
            <div
              className={`md:flex-shrink-0 p-6 ${
                isDarkTheme
                  ? "bg-gradient-to-br from-red-900 to-black"
                  : "bg-gradient-to-br from-blue-400 to-indigo-400"
              }`}
            >
              <div className="relative flex justify-center items-center w-48 h-48 mx-auto md:w-40 md:h-40">
                <img
                  src={author.profileImage || "/default-profile.png"}
                  className={`w-full h-full object-cover border-4 ${
                    isDarkTheme ? "border-red-600" : "border-white"
                  } shadow-inner rounded-full transition-transform duration-300 hover:scale-105`}
                  alt="Author Profile"
                  style={
                    isDarkTheme
                      ? {
                          filter:
                            "grayscale(50%) brightness(70%) contrast(120%)",
                        }
                      : {}
                  }
                />
              </div>
            </div>
            <div className="p-8 md:flex-grow">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h1
                  className={`text-3xl font-bold mb-2 md:mb-0 ${
                    isDarkTheme ? "text-red-500" : "text-gray-900"
                  }`}
                >
                  {author.username}
                </h1>
                <p
                  className={`text-sm ${
                    isDarkTheme ? "text-red-300" : "text-gray-600"
                  }`}
                >
                  {author.email || "Email not provided"}
                </p>
              </div>
              <p
                className={`text-xl italic mb-4 ${
                  isDarkTheme ? "text-red-400" : "text-gray-700"
                }`}
              >
                "{author.headline || "No headline available"}"
              </p>
              <p
                className={`mb-4 ${
                  isDarkTheme ? "text-red-200" : "text-gray-600"
                }`}
              >
                {author.bio || "No bio available"}
              </p>
              <p
                className={`text-sm ${
                  isDarkTheme ? "text-red-300" : "text-gray-500"
                }`}
              >
                Member since: {new Date(author.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Author Projects Section */}
        <div
          className={`shadow-xl p-8 transition-all duration-500 ${
            isDarkTheme
              ? "bg-gray-900 text-red-500 border-red-600 border-2"
              : "bg-white"
          }`}
          style={isDarkTheme ? darkThemeCardStyles : {}}
        >
          <h2
            className={`text-2xl font-bold mb-6 ${
              isDarkTheme ? "text-red-500" : "text-gray-900"
            }`}
          >
            Author's Projects
          </h2>
          {authorProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {authorProjects.map((project) => (
                <div key={project._id} className="group">
                  <Link
                    to={`/project/${project._id}`}
                    onClick={(event) => handleProjectClick(event, project._id)}
                    className="block relative w-full h-[200px] mb-4 overflow-hidden shadow-md transition-transform duration-300 hover:scale-105"
                  >
                    <img
                      src={project.thumbnail}
                      alt={project.projectName}
                      className="w-full h-full object-cover"
                      style={
                        isDarkTheme
                          ? {
                              filter:
                                "grayscale(50%) brightness(70%) contrast(120%)",
                            }
                          : {}
                      }
                    />
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                        isDarkTheme
                          ? "bg-red-900 bg-opacity-70"
                          : "bg-black bg-opacity-0 group-hover:bg-opacity-50"
                      }`}
                    >
                      <h2
                        className={`text-2xl font-bold text-center px-4 transition-opacity duration-300 ${
                          isDarkTheme
                            ? "text-red-300 opacity-100"
                            : "text-white opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        {project.projectName}
                      </h2>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className={isDarkTheme ? "text-red-300" : "text-gray-600"}>
              No projects available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
