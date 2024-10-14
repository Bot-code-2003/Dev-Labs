import React from "react";

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl w-full">
        <h2 className="text-xl font-bold mb-4">{project.projectName}</h2>
        <img
          src={project.projectThumbnail}
          className="rounded-md w-full h-64 object-cover mb-4"
          alt={project.projectName}
        />
        <p className="text-gray-700">{project.projectDescription}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProjectModal;
