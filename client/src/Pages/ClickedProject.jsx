import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { likeProject, unlikeProject } from "../actions/project";
import { IconButton } from "@mui/material";
import { Visibility, Favorite, FavoriteBorder } from "@mui/icons-material";
import Discussions from "../components/Discussions";
import ImageCarousel from "../components/ImageCarousel"; // Import the new ImageCarousel component

export default function ClickedProject() {
  const dispatch = useDispatch();
  const projectData = useSelector((state) => state.projects.clickedProject);
  const localData = JSON.parse(localStorage.getItem("user"));
  const userId = localData?._id || localData?.userId;
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
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src={projectData.thumbnail}
              alt={projectData.projectName}
              className="w-full h-44 sm:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white">
                {projectData.projectName}
              </h1>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <img
                  src={projectData.logo}
                  alt="Project Logo"
                  className="w-10 h-10 rounded-md"
                />
                <span className="text-xl font-semibold">
                  {projectData.projectName}
                </span>
              </div>
              <button
                onClick={handleLikeClick}
                className={`flex items-center space-x-1 ${
                  liked ? "text-red-500" : "text-gray-500"
                } hover:text-red-500 transition-colors`}
              >
                {liked ? <Favorite /> : <FavoriteBorder />}
                <span>{projectData.projectLikes.length}</span>
              </button>
            </div>
            <p className="text-gray-600 mb-4">{projectData.description}</p>
            <div className="flex space-x-4 mb-6">
              {projectData.link ? (
                <a
                  href={projectData.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 flex items-center space-x-2 hover:bg-blue-600 transition-colors"
                >
                  <Visibility />
                  <span>View Project</span>
                </a>
              ) : (
                <p className="text-gray-600">
                  No link available contact the creator.
                </p>
              )}
            </div>
            <div className="border-t pt-4">
              <h2 className="text-xl font-semibold mb-2">Project Images</h2>
              <ImageCarousel images={projectData.images} />{" "}
              {/* Use the ImageCarousel */}
            </div>
          </div>
        </div>
        <div className="mt-8 bg-white shadow-lg  p-6">
          <h2 className="text-2xl font-semibold mb-4">About the Creator</h2>
          <div className="flex items-center space-x-4">
            <img
              src={projectData.authorId.profileImage}
              alt={projectData.authorId.username}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-xl font-semibold">
                {projectData.authorId.username}
              </h3>
              <p className="text-gray-600">{projectData.authorId.headline}</p>
            </div>
          </div>
          <p className="mt-4 text-gray-700">{projectData.authorId.bio}</p>
        </div>
        <div className="mt-8 bg-white shadow-lg p-6">
          <Discussions
            projectId={projectData._id}
            authorId={projectData.authorId}
          />
        </div>
      </div>
    </div>
  );
}
