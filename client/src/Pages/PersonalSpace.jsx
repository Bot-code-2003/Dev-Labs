import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { editImage } from "../actions/user"; // Assuming these functions will save the image and fetch user projects
import { getUserProjects, deleteProject } from "../actions/project";
import { useDispatch, useSelector } from "react-redux";

const PersonalSpace = () => {
  const dispatch = useDispatch();

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserImage = loggedInUser?.authorImage;
  const loggedInUserName = loggedInUser?.name;
  const loggedInUserId = loggedInUser?.userId;

  const [showEdit, setShowEdit] = useState(false);
  const [newImage, setNewImage] = useState(null); // State to store the selected new image

  // Fetch projects related to the logged-in user
  useEffect(() => {
    if (loggedInUserId) {
      dispatch(getUserProjects(loggedInUserId));
    }
  }, [dispatch, loggedInUserId]);

  const userProjects = useSelector((state) => state.projects.userProjects);

  const handleImageEdit = () => {
    // Trigger file input click to select a new image
    document.getElementById("file-input").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const sizeInKB = file.size / 1024; // Calculate the file size in KB

    // Read and set the selected image for preview
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        // Resize and compress the image using canvas
        compressAndResizeImage(img, sizeInKB);
      };
    };
    reader.readAsDataURL(file);
  };

  const compressAndResizeImage = (image, sizeInKB) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas size to a fixed 250x250 pixels
    const WIDTH = 250;
    const HEIGHT = 250;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    // Draw the image on the canvas with fixed dimensions
    ctx.drawImage(image, 0, 0, WIDTH, HEIGHT);

    // Determine compression quality based on the original file size
    let quality;
    if (sizeInKB > 1000) {
      quality = 0.2; // High compression for large files (>1MB)
    } else if (sizeInKB > 500) {
      quality = 0.5; // Medium compression for moderately large files (500KB-1MB)
    } else {
      quality = 0.8; // Low compression for small files (<500KB)
    }

    // Convert the canvas to a compressed image with the chosen quality
    const compressedImageDataUrl = canvas.toDataURL("image/jpeg", quality);

    // Set the compressed image in state
    setNewImage(compressedImageDataUrl);
  };

  const handleSaveImage = () => {
    if (newImage) {
      // Dispatch an action or save image to backend
      dispatch(editImage(newImage, loggedInUserId)); // Assuming this function sends a request to the backend

      // Update the local storage and state after successful save
      const updatedUser = { ...loggedInUser, authorImage: newImage };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.location.reload(); // Reload to reflect changes or set state appropriately
    }
  };

  const handleCancelImage = () => {
    // Reset the newImage state to null to cancel changes
    setNewImage(null);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      dispatch(deleteProject(projectId));
    }
  };

  return (
    <div className="p-3 sm:p-10">
      <div className="flex flex-col items-center justify-center relative">
        {/* User Profile Image */}
        <div
          className="relative w-32 h-32"
          onMouseEnter={() => setShowEdit(true)}
          onMouseLeave={() => setShowEdit(false)}
        >
          <img
            src={newImage || loggedInUserImage}
            className="w-full h-full rounded-full object-cover"
            alt="Profile"
          />

          {/* Overlay and Edit Icon */}
          {showEdit && (
            <div
              onClick={handleImageEdit}
              className="absolute cursor-pointer inset-0 bg-white bg-opacity-50 rounded-full flex items-center justify-center transition-opacity duration-300 ease-in-out"
            >
              <EditIcon className="text-gray-700" fontSize="large" />
            </div>
          )}

          {/* File input for image selection */}
          <input
            id="file-input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        {/* User Name */}
        <h1 className="text-2xl font-bold mt-5 text-gray-700">
          {loggedInUserName}
        </h1>
      </div>

      {/* Save and Cancel Buttons for new image */}
      {newImage && (
        <div className="flex mt-5 gap-3">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSaveImage}
          >
            Save Profile Image
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            onClick={handleCancelImage}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Projects Section */}
      <div>
        <h1 className="text-2xl font-bold mt-10 text-gray-700">
          Your Projects
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-5">
          {userProjects.map((project) => (
            <div
              key={project._id}
              className="border rounded-lg shadow-md overflow-hidden bg-white"
            >
              <img
                src={project.projectThumbnail}
                alt={project.projectName}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex flex-col">
                <h2 className="text-lg font-bold text-gray-800">
                  {project.projectName}
                </h2>
                <button
                  className="self-end text-red-500 mt-3 hover:text-red-700"
                  onClick={() => handleDeleteProject(project._id)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalSpace;
