import React, { useState } from "react";
import { useSelector } from "react-redux";

const ClickedProject = () => {
  // State to track the selected image for the modal
  const [selectedImage, setSelectedImage] = useState(null);

  // Retrieve project data from Redux state
  const projectData = useSelector((state) => state.projects.clickedProject);

  // Log the entire Redux state for debugging purposes
  console.log(projectData);

  // Check if projectData exists
  if (!projectData) {
    return <div>No project data available.</div>; // Handle case when no project is found
  }

  // Function to close the modal
  const closeModal = () => setSelectedImage(null);

  return (
    <div className="relative flex flex-col items-center p-4">
      {/* Project Name */}
      <h1 className="text-3xl font-bold mb-2">{projectData.projectName}</h1>

      {/* Author Info */}
      <p className="text-gray-600 text-lg mb-2">By: {projectData.author}</p>

      {/* Project Description */}
      <p className="text-gray-800 mb-4">{projectData.projectDescription}</p>

      {/* Project Thumbnail */}
      <img
        src={projectData.projectThumbnail}
        alt={projectData.projectName}
        className="rounded-md w-[800px] object-cover mb-4 shadow-md"
      />

      {/* Project Images Grid */}
      {projectData.projectImages && projectData.projectImages.length > 0 && (
        <div>
          <h1 className="text-center text-2xl text-gray-500 mb-2">
            Project Images
          </h1>
          <div className="grid grid-cols-3 gap-2">
            {projectData.projectImages.map((image) => (
              <img
                key={image}
                src={image}
                alt={projectData.projectName}
                className="rounded-md object-cover shadow-md cursor-pointer"
                onClick={() => setSelectedImage(image)} // Open the modal on click
              />
            ))}
          </div>
        </div>
      )}

      {/* Tech Stack */}
      {projectData.techStack && (
        <p className="text-gray-600 mb-4">
          <strong>Tech Stack:</strong> {projectData.techStack}
        </p>
      )}

      {/* Project URL */}
      {projectData.projectURL && (
        <a
          href={projectData.projectURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Project
        </a>
      )}

      {/* Modal for Image Display */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-screen-lg max-h-screen object-contain rounded-md"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-2xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Background dimming effect */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={closeModal}
        />
      )}
    </div>
  );
};

export default ClickedProject;
