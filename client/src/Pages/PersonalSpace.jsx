import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { editImage } from "../actions/user";
import { getUserProjects, deleteProject } from "../actions/project";
import { useDispatch, useSelector } from "react-redux";

const PersonalSpace = () => {
  const dispatch = useDispatch();
  const loggedInUser = JSON.parse(localStorage.getItem("user")) || {};
  const {
    profileImage: loggedInUserImage,
    username: loggedInUserName,
    userId: loggedInUserId,
    email: loggedInUserEmail,
    bio: loggedInUserBio,
    headline: loggedInUserHeadline,
    createdAt: loggedInUserCreatedAt,
  } = loggedInUser;

  const [newImage, setNewImage] = useState(null);
  const userProjects = useSelector((state) => state.projects.userProjects);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (loggedInUserId) {
      setLoading(true);
      dispatch(getUserProjects(loggedInUserId)).finally(() =>
        setLoading(false)
      );
    }
  }, [dispatch, loggedInUserId]);

  const handleImageEdit = () => {
    document.getElementById("file-input").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setNewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = async () => {
    if (newImage) {
      setLoading(true);
      await dispatch(editImage(newImage, loggedInUserId));
      const updatedUser = { ...loggedInUser, profileImage: newImage };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setNewImage(null);
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setDeleteLoading(true);
      await dispatch(deleteProject(projectId));
      setDeleteLoading(false);
    }
  };

  return (
    <div className=" min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* User Profile Section */}
        <div className="bg-white shadow-xl overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:flex-shrink-0 p-6 bg-gradient-to-br from-blue-400 to-indigo-400">
              <div className="relative w-48 h-48 mx-auto md:w-40 md:h-40">
                <img
                  src={newImage || loggedInUserImage}
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-inner"
                  alt="Profile"
                />
                <button
                  onClick={handleImageEdit}
                  className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                >
                  <EditIcon fontSize="small" className="text-blue-600" />
                </button>
              </div>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              {newImage && (
                <button
                  className={`mt-4 w-full bg-white text-blue-600 px-4 py-2 rounded-full transition hover:bg-blue-50 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleSaveImage}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save New Image"}
                </button>
              )}
            </div>
            <div className="p-8 md:flex-grow">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 md:mb-0">
                  {loggedInUserName}
                </h1>
                <p className="text-gray-600 text-sm">{loggedInUserEmail}</p>
              </div>
              <p className="text-xl text-gray-700 italic mb-4">
                "{loggedInUserHeadline || "No headline available"}"
              </p>
              <p className="text-gray-600 mb-4">
                {loggedInUserBio || "No bio available"}
              </p>
              <p className="text-gray-500 text-sm">
                Member since:{" "}
                {new Date(loggedInUserCreatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* User Projects Section */}
        <div className="bg-white shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Your Projects
          </h2>
          {loading ? (
            <p className="text-gray-600">Loading projects...</p>
          ) : userProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {userProjects.map((project) => (
                <div
                  key={project._id}
                  className="bg-gray-50 rounded-xl shadow-md transition transform hover:shadow-lg hover:-translate-y-1"
                >
                  <img
                    src={project.projectThumbnail}
                    alt={project.projectName}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold text-xl text-gray-900 mb-2">
                      {project.projectName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => handleDeleteProject(project._id)}
                        className={`text-red-500 hover:text-red-700 transition ${
                          deleteLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={deleteLoading}
                      >
                        {deleteLoading ? "Deleting..." : <DeleteIcon />}
                      </button>
                    </div>
                  </div>
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

export default PersonalSpace;
