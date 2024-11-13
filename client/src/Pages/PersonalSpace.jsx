import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "../components/ProjectCard";
import { editImage, editUserDetails } from "../actions/user";
import { getUserProjects, deleteProject } from "../actions/project";
import EditProfileModal from "../components/EditProfileModal"; // New component

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
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const userProjects = useSelector((state) => state.projects.userProjects);

  useEffect(() => {
    if (userProjects.length === 0 && loggedInUserId) {
      setLoading(true);
      dispatch(getUserProjects(loggedInUserId)).finally(() =>
        setLoading(false)
      );
    }
  }, [dispatch, loggedInUserId, userProjects.length]);

  const handleImageEdit = () => document.getElementById("file-input").click();

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
      setLoading(true);
      await dispatch(deleteProject(projectId));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 dark:text-gray-300 bg-gray-200 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* User Profile Section */}
        <div className="shadow-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
          <div className="md:flex">
            <div className="md:flex-shrink-0 p-6 bg-gradient-to-br from-blue-400 to-indigo-400 dark:from-blue-600 dark:to-purple-600">
              <div className="relative flex justify-center items-center w-48 h-48 mx-auto md:w-40 md:h-40">
                <img
                  src={newImage || loggedInUserImage}
                  className="w-full h-full object-cover border-4 border-white shadow-inner"
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
                  onClick={handleSaveImage}
                  className={`mt-4 w-full bg-white text-blue-600 px-4 py-2 transition hover:bg-blue-50 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save New Image"}
                </button>
              )}
            </div>
            <div className="p-8 md:flex-grow">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h1 className="text-3xl font-bold mb-2 md:mb-0">
                  {loggedInUserName}
                </h1>
                <h1>{loggedInUserEmail}</h1>
                <button
                  onClick={() => setEditModalOpen(true)}
                  className="bg-blue-500 text-white px-4 py-2 shadow hover:bg-blue-600 transition"
                >
                  Edit Profile
                </button>
              </div>
              <p className="text-xl italic mb-4">
                {loggedInUserHeadline || "No headline available"}
              </p>
              <p className="mb-4">{loggedInUserBio || "No bio available"}</p>
              <p>member since {loggedInUserCreatedAt}</p>
            </div>
          </div>
        </div>

        {/* Modal for Editing Profile */}
        {editModalOpen && (
          <EditProfileModal
            formData={{
              username: loggedInUserName,
              headline: loggedInUserHeadline,
              bio: loggedInUserBio,
              email: loggedInUserEmail,
            }}
            setEditModalOpen={setEditModalOpen}
            userId={loggedInUserId}
            loading={loading}
            setLoading={setLoading}
          />
        )}

        {/* Projects Section */}
        <div className="shadow-xl p-4 sm:p-8 bg-gray-100 dark:bg-gray-700">
          <h2 className="text-2xl font-bold mb-6">Your Projects</h2>
          {loading ? (
            <p className="text-gray-500">Loading projects...</p>
          ) : userProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {userProjects.map((project) => (
                <div key={project._id}>
                  <ProjectCard project={project} />
                  <button
                    onClick={() => handleDeleteProject(project._id)}
                    className="w-full bg-red-400 text-white px-4 py-2 shadow hover:bg-red-500 transition"
                  >
                    Delete Project
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No projects found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalSpace;
