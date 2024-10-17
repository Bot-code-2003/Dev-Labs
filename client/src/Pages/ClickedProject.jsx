import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import { useLocation } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import Face4Icon from "@mui/icons-material/Face4";
import { likeProject, unlikeProject } from "../actions/project";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ShortcutIcon from "@mui/icons-material/Shortcut";

const ClickedProject = () => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const projectData = useSelector((state) => state.projects.clickedProject);

  const localData = JSON.parse(localStorage.getItem("user"));
  const userId = localData?.userId;

  // Check if userId is in projectLikes
  const userHasLiked = projectData?.projectLikes.includes(userId);
  console.log("Type: ", projectData?.projectLikes);

  console.log("userHasLiked: ", userHasLiked);

  const [liked, setLiked] = useState(userHasLiked);

  // Like or unlike handler
  const handleLikeClick = () => {
    if (liked) {
      // Dispatch unlike action if the user has already liked the project
      dispatch(unlikeProject(projectData._id, userId));
      setLiked(false);
    } else {
      // Dispatch like action if the user hasn't liked the project yet
      dispatch(likeProject(projectData._id, userId));
      setLiked(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [useLocation]);

  if (!projectData) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-gray-700">
        No project data available.
      </div>
    );
  }

  const closeModal = () => setSelectedImage(null);

  return (
    <div className="relative project-container flex flex-col justify-center items-center w-full p-6 bg-white text-gray-900">
      {/* Like button */}
      <div
        className="fixed right-5 "
        style={{
          top: "50%", // Vertically centered
          transform: "translateY(-50%)", // Center the element on the Y axis
        }}
      >
        <div
          onClick={handleLikeClick}
          className={`mb-2 flex items-center justify-center text-lg p-3 rounded-full cursor-pointer transition-colors duration-200 ${
            liked ? "bg-red-600" : "bg-blue-500"
          }`}
        >
          <ThumbUpAltIcon style={{ color: "white", fontSize: "2rem" }} />
        </div>
        <a
          href={projectData.projectURL}
          className="flex items-center justify-center text-lg p-3 rounded-full cursor-pointer transition-colors duration-200 bg-blue-500"
        >
          <AdsClickIcon style={{ color: "white", fontSize: "2rem" }} />
        </a>
      </div>

      {/* Hero Section */}
      <section className="hero w-full mb-10 text-center flex flex-col items-center justify-center">
        <h1 className="text-4xl flex items-center gap-5 font-extrabold mb-4 text-gray-700">
          {projectData.projectName}
        </h1>
        <p className="text-gray-700 text-xl max-w-5xl text-center mb-4">
          {projectData.projectDescription}
        </p>
        {/* Tech Stack */}
        {projectData.techStack && (
          <div className="mb-4">
            <ul className="flex flex-wrap gap-2">
              {projectData.techStack.split(",").map((tech, index) => (
                <li
                  key={index}
                  className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-medium"
                >
                  {tech.trim()}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Author */}
        {projectData.author && (
          <p className="text-gray-700 flex items-center gap-2 text-lg">
            <Face4Icon fontSize="small" /> {projectData.author}
          </p>
        )}
      </section>

      {/* Main Content */}
      <div className="w-full flex flex-col items-center">
        {/* Thumbnail and Images */}
        <div className="flex flex-col gap-6 max-w-[80%] mb-4">
          <div className="relative group">
            <img
              onClick={() => setSelectedImage(projectData.projectThumbnail)}
              src={projectData.projectThumbnail}
              alt={projectData.projectName}
              className="rounded-lg w-full h-auto object-cover cursor-pointer transition-transform transform group-hover:scale-[1.01] shadow-lg"
            />
          </div>

          {projectData.projectImages &&
            projectData.projectImages.length > 0 && (
              <div className="grid sm:grid-cols-3 gap-4">
                {projectData.projectImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="rounded-md object-cover cursor-pointer shadow-md transition hover:scale-[1.02]"
                    onClick={() => setSelectedImage(image)}
                  />
                ))}
              </div>
            )}
        </div>

        {/* Project Details */}
        <div className="flex gap-3">
          {/* Project URL */}
          {projectData.projectURL && (
            <a
              href={projectData.projectURL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 flex gap-2 items-center "
            >
              View Project
              <AdsClickIcon />
            </a>
          )}

          {/* Github URL */}
          {projectData.githubURL && (
            <a
              href={projectData.githubURL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-900 transition duration-300 flex gap-2 items-center"
            >
              View Github
              <GitHubIcon />
            </a>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-screen-lg max-h-screen object-contain rounded-md"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white shadow bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded-full text-2xl font-bold"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClickedProject;
