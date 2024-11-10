import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { editImage, editUserDetails } from "../actions/user";
import { getUserProjects, deleteProject } from "../actions/project";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "../components/ProjectCard";

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
    skills: loggedInUserSkills,
    currentPosition: loggedInUserCurrentPosition,
    college: loggedInUserCollege,
    nation: loggedInUserNation,
  } = loggedInUser;

  const [newImage, setNewImage] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    headline: loggedInUserHeadline,
    bio: loggedInUserBio,
    skills: loggedInUserSkills,
    currentPosition: loggedInUserCurrentPosition,
    college: loggedInUserCollege,
    nation: loggedInUserNation,
  });

  const userProjects = useSelector((state) => state.projects.userProjects);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (userProjects.length === 0 && loggedInUserId) {
      setLoading(true);
      dispatch(getUserProjects(loggedInUserId)).finally(() =>
        setLoading(false)
      );
    }
  }, [dispatch, loggedInUserId]);

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
      setDeleteLoading(true);
      await dispatch(deleteProject(projectId));
      setDeleteLoading(false);
    }
  };

  // Edit Modal Functions
  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateDetails = async () => {
    setLoading(true);
    await dispatch(editUserDetails(formData, loggedInUserId));
    localStorage.setItem(
      "user",
      JSON.stringify({ ...loggedInUser, ...formData })
    );
    setLoading(false);
    closeEditModal();
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8  dark:text-gray-300  bg-gray-200 dark:bg-gray-800 relative">
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
                  className={`mt-4 w-full bg-white text-blue-600 px-4 py-2 transition hover:bg-blue-50 ${
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
                <h1 className="text-3xl font-bold mb-2 md:mb-0 ">
                  {loggedInUserName}
                </h1>
                <button
                  onClick={openEditModal}
                  className="bg-blue-500 text-white px-4 py-2 shadow hover:bg-blue-600 transition"
                >
                  Edit Profile
                </button>
              </div>
              <p className="text-xl italic mb-4 ">
                "{loggedInUserHeadline || "No headline available"}"
              </p>
              <p className="mb-4 ">{loggedInUserBio || "No bio available"}</p>
              <p className="">
                Skills: {loggedInUserSkills || "No skills listed"}
              </p>
              <p className="">
                Position:{" "}
                {loggedInUserCurrentPosition || "No position available"}
              </p>
              <p className="">
                College: {loggedInUserCollege || "No college info"}
              </p>
              <p className="">
                Nation: {loggedInUserNation || "No nation info"}
              </p>
            </div>
          </div>
        </div>

        {/* Modal for Editing Profile */}
        {editModalOpen && (
          <div className=" fixed inset-0 -top-10 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-100 dark:bg-gray-200 dark:text-gray-600 p-6 max-w-5xl max-h-[90vh] overflow-scroll">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                <button
                  onClick={closeEditModal}
                  className="p-2 border border-black"
                >
                  X
                </button>
              </div>
              {/** For username */}

              <label
                className="text-sm font-semibold text-gray-700 mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={loggedInUserName}
                onChange={handleFormChange}
                placeholder="Username"
                className="w-full mb-3 p-2 border border-gray-300 "
              />
              <label
                className="text-sm font-semibold text-gray-700 mb-2"
                htmlFor="headline"
              >
                Headline
              </label>
              <input
                id="headline"
                type="text"
                name="headline"
                value={formData.headline}
                onChange={handleFormChange}
                placeholder="Headline"
                className="w-full mb-3 p-2 border border-gray-300 "
              />

              <label
                className="text-sm font-semibold text-gray-700 mb-2"
                htmlFor="bio"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleFormChange}
                placeholder="Bio"
                className="w-full mb-3 p-2 border border-gray-300 "
              />

              <label
                className="text-sm font-semibold text-gray-700 mb-2"
                htmlFor="skills"
              >
                Skills
              </label>
              <input
                id="skills"
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleFormChange}
                placeholder="Skills"
                className="w-full mb-3 p-2 border border-gray-300 "
              />

              <label
                className="text-sm font-semibold text-gray-700 mb-2"
                htmlFor="currentPosition"
              >
                Current Position
              </label>
              <input
                id="currentPosition"
                type="text"
                name="currentPosition"
                value={formData.currentPosition}
                onChange={handleFormChange}
                placeholder="Current Position"
                className="w-full mb-3 p-2 border border-gray-300 "
              />

              <label
                className="text-sm font-semibold text-gray-700 mb-2"
                htmlFor="college"
              >
                College
              </label>
              <input
                id="college"
                type="text"
                name="college"
                value={formData.college}
                onChange={handleFormChange}
                placeholder="College"
                className="w-full mb-3 p-2 border border-gray-300 "
              />

              <label
                className="text-sm font-semibold text-gray-700 mb-2"
                htmlFor="nation"
              >
                Nation
              </label>
              <input
                id="nation"
                type="text"
                name="nation"
                value={formData.nation}
                onChange={handleFormChange}
                placeholder="Nation"
                className="w-full mb-3 p-2 border border-gray-300 "
              />

              <button
                onClick={handleUpdateDetails}
                className="bg-blue-500 text-white px-4 py-2 w-full"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
              <button
                onClick={closeEditModal}
                className="mt-3 text-gray-600 underline w-full text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="shadow-xl p-4 sm:p-8 bg-gray-100 dark:bg-gray-700">
          <h2 className="text-2xl font-bold mb-6 ">Your Projects</h2>
          {loading ? (
            <p className="text-gray-500">Loading projects...</p>
          ) : userProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {userProjects.map((project) => (
                <div key={project._id}>
                  <ProjectCard
                    project={project}
                    onClick={() => {}}
                    // Include delete button in ProjectCard
                  />
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
