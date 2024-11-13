import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editProject } from "../actions/project"; // Assuming you have an action to edit project

const EditProjectModal = ({ project, setEditModalOpen, setLoading }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    projectName: project.projectName,
    tagline: project.tagline,
    description: project.description,
    projectType: project.projectType,
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateProject = async () => {
    setLoading(true);
    await dispatch(editProject(formData, project._id)); // Assuming editProject action is implemented
    setLoading(false);
    setEditModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-100 dark:bg-gray-200 dark:text-gray-600 p-6 max-w-5xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold mb-4">Edit Project</h2>
          <button
            onClick={() => setEditModalOpen(false)}
            className="p-2 border border-black"
          >
            X
          </button>
        </div>

        <label
          className="text-sm font-semibold text-gray-700 mb-2"
          htmlFor="projectName"
        >
          Project Name
        </label>
        <input
          id="projectName"
          type="text"
          name="projectName"
          value={formData.projectName}
          onChange={handleFormChange}
          placeholder="Project Name"
          className="w-full mb-3 p-2 border border-gray-300"
        />

        <label
          className="text-sm font-semibold text-gray-700 mb-2"
          htmlFor="tagline"
        >
          Tagline
        </label>
        <input
          id="tagline"
          type="text"
          name="tagline"
          value={formData.tagline}
          onChange={handleFormChange}
          placeholder="Tagline"
          className="w-full mb-3 p-2 border border-gray-300"
        />

        <label
          className="text-sm font-semibold text-gray-700 mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleFormChange}
          placeholder="Description"
          className="w-full mb-3 p-2 border border-gray-300"
        />

        <label
          className="text-sm font-semibold text-gray-700 mb-2"
          htmlFor="projectType"
        >
          Project Type
        </label>
        <input
          id="projectType"
          type="text"
          name="projectType"
          value={formData.projectType}
          onChange={handleFormChange}
          placeholder="Project Type"
          className="w-full mb-3 p-2 border border-gray-300"
        />

        <button
          onClick={handleUpdateProject}
          className="bg-blue-500 text-white px-4 py-2 w-full"
        >
          {loading ? "Updating..." : "Update Project"}
        </button>

        <button
          onClick={() => setEditModalOpen(false)}
          className="mt-3 text-gray-600 underline w-full text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProjectModal;
