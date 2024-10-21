import React, { useState } from "react";

const ShareProjectAbout = ({ handleNext }) => {
  const [projectName, setProjectName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log({
      projectName,
      tagline,
      description,
      link,
    });

    handleNext();
    // You can add any logic here to handle the form submission (like dispatching an action)
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Share Project - About</h2>
      <form onSubmit={handleFormSubmit}>
        {/* Project Name */}
        <div className="mb-4">
          <label
            htmlFor="projectName"
            className="block text-lg font-medium mb-1"
          >
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your project name"
            required
          />
        </div>

        {/* Tagline */}
        <div className="mb-4">
          <label htmlFor="tagline" className="block text-lg font-medium mb-1">
            Tagline
          </label>
          <input
            type="text"
            id="tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a short tagline"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-lg font-medium mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a detailed description of your project"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Project Link */}
        <div className="mb-4">
          <label htmlFor="link" className="block text-lg font-medium mb-1">
            Project Link
          </label>
          <input
            type="url"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the project link (e.g., GitHub, live demo)"
            required
          />
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShareProjectAbout;
