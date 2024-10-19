import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { likeProject, unlikeProject } from "../actions/project";
import Reviews from "../components/Reviews";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { IconButton } from "@mui/material";
import {
  Visibility,
  GitHub,
  Person,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";

export default function ClickedProject() {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const projectData = useSelector((state) => state.projects.clickedProject);
  const localData = JSON.parse(localStorage.getItem("user"));
  const userId = localData?.userId;
  const userHasLiked = projectData?.projectLikes.includes(userId);
  const [liked, setLiked] = useState(userHasLiked);

  const handleLikeClick = () => {
    if (userId) {
      if (liked) {
        dispatch(unlikeProject(projectData._id, userId));
        setLiked(false);
      } else {
        dispatch(likeProject(projectData._id, userId));
        setLiked(true);
      }
    } else {
      alert("Please login to like or unlike a project");
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

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Hero Section */}
          <div className="relative">
            <img
              src={projectData.projectThumbnail}
              alt={projectData.projectName}
              className="w-full h-80 sm:h-auto object-cover "
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">
                  {projectData.projectName}
                </h1>
                <div className="flex justify-center space-x-4">
                  <a
                    href={projectData.projectURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 flex items-center space-x-2"
                  >
                    <span>View Project</span>
                    <Visibility />
                  </a>
                  {projectData.githubURL && (
                    <a
                      href={projectData.githubURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-gray-900 transition duration-300 flex items-center space-x-2"
                    >
                      <span>View Github</span>
                      <GitHub />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="px-6 py-8">
            <p className="text-gray-700 text-lg mb-6">
              {projectData.projectDescription}
            </p>

            {projectData.techStack && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {projectData.techStack.split(",").map((tech, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {projectData.author && (
              <div className="flex items-center space-x-2 mb-6">
                <Person className="h-6 w-6 text-gray-600" />
                <span className="text-gray-700 text-lg">
                  {projectData.author}
                </span>
              </div>
            )}

            {/* Like Button */}
            <button
              onClick={handleLikeClick}
              className={`flex items-center space-x-2 ${
                liked
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded-full transition duration-300`}
            >
              {liked ? <Favorite /> : <FavoriteBorder />}
              <span>{liked ? "Unlike" : "Like"}</span>
            </button>
          </div>

          {/* Project Images */}
          {projectData.projectImages &&
            projectData.projectImages.length > 0 && (
              <div className="px-6 py-8 bg-gray-50">
                <h2 className="text-2xl font-semibold mb-4">Project Images</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projectData.projectImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Project Image ${index + 1}`}
                      className="rounded-lg shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
                      onClick={() => setSelectedImage(image)}
                    />
                  ))}
                </div>
              </div>
            )}

          {/* Reviews Section */}
          <div className="px-6 py-8">
            {/* <Reviews /> */}
            <h1>Reviews feature comming soon...</h1>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <div className="absolute top-0 right-0">
              <IconButton
                onClick={() => setSelectedImage(null)}
                className="absolute text-white"
              >
                <CloseFullscreenIcon className="text-white" />
              </IconButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
