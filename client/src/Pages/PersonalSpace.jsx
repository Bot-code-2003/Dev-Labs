import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { editImage } from "../actions/user";
import { getUserProjects, deleteProject } from "../actions/project";
import { useDispatch, useSelector } from "react-redux";

const PersonalSpace = () => {
  const dispatch = useDispatch();
  const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");
  const {
    authorImage: loggedInUserImage,
    name: loggedInUserName,
    userId: loggedInUserId,
  } = loggedInUser;

  const [newImage, setNewImage] = useState(null);
  const userProjects = useSelector((state) => state.projects.userProjects);

  useEffect(() => {
    if (loggedInUserId) {
      dispatch(getUserProjects(loggedInUserId));
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
      await dispatch(editImage(newImage, loggedInUserId));
      const updatedUser = { ...loggedInUser, authorImage: newImage };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.location.reload();
    }
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      dispatch(deleteProject(projectId));
    }
  };

  return (
    <div className="p-4">
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <img
            src={newImage || loggedInUserImage}
            className="w-32 h-32 rounded-full object-cover mb-4"
            alt="Profile"
          />
          <button
            onClick={handleImageEdit}
            className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md"
          >
            <EditIcon fontSize="small" />
          </button>
        </div>
        <h1 className="text-2xl font-bold">{loggedInUserName}</h1>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        {newImage && (
          <button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSaveImage}
          >
            Save New Image
          </button>
        )}
      </div>

      <h2 className="text-xl font-bold mb-4 px-4">Your Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4">
        {userProjects.map((project) => (
          <div
            key={project._id}
            className="border rounded-lg overflow-hidden shadow-sm"
          >
            <img
              src={project.projectThumbnail}
              alt={project.projectName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex justify-between items-center">
              <h3 className="font-semibold">{project.projectName}</h3>
              <button
                onClick={() => handleDeleteProject(project._id)}
                className="text-red-500 hover:text-red-700"
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalSpace;
