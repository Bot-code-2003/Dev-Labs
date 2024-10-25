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
    return <p>Loading author profile...</p>;
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Author Profile Section */}
        <div className="bg-white shadow-xl overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:flex-shrink-0 p-6 bg-gradient-to-br from-blue-400 to-indigo-400">
              <div className="relative flex justify-center items-center w-48 h-48 mx-auto md:w-40 md:h-40">
                <img
                  src={author.profileImage || "/default-profile.png"}
                  className="w-full h-full object-cover border-4 border-white shadow-inner rounded-full"
                  alt="Author Profile"
                />
              </div>
            </div>
            <div className="p-8 md:flex-grow">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 md:mb-0">
                  {author.username}
                </h1>
                <p className="text-gray-600 text-sm">
                  {author.email || "Email not provided"}
                </p>
              </div>
              <p className="text-xl text-gray-700 italic mb-4">
                "{author.headline || "No headline available"}"
              </p>
              <p className="text-gray-600 mb-4">
                {author.bio || "No bio available"}
              </p>
              <p className="text-gray-500 text-sm">
                Member since: {new Date(author.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Author Projects Section */}
        <div className="bg-white shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Author's Projects
          </h2>
          {authorProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {authorProjects.map((project) => (
                <div key={project._id} className="group">
                  <Link
                    to={`/project/${project._id}`}
                    onClick={(event) => handleProjectClick(event, project._id)}
                    className="block relative w-full h-[200px] mb-4 overflow-hidden"
                  >
                    <img
                      src={project.thumbnail}
                      alt={project.projectName}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-300">
                      <h2 className="text-white text-2xl font-bold text-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.projectName}
                      </h2>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No projects available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
