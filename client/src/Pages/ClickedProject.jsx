import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProject, likeProject, unlikeProject } from "../actions/project";
import { Visibility } from "@mui/icons-material";
import Discussions from "../components/Discussions";
import ImageCarousel from "../components/ImageCarousel";
import LinkIcon from "@mui/icons-material/Link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

export default function ClickedProject() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const projectData = useSelector((state) => state.projects.clickedProject);
  const localData = JSON.parse(localStorage.getItem("user"));
  const userId = localData?._id || localData?.userId;
  const userHasLiked = projectData?.projectLikes.includes(userId);

  const [liked, setLiked] = useState(userHasLiked);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);

  const handleLikeClick = () => {
    if (userId) {
      if (liked) {
        dispatch(unlikeProject(projectData._id, userId));
      } else {
        dispatch(likeProject(projectData._id, userId));
      }
      setLiked(!liked);
    } else {
      alert("Please login to like or unlike a project");
    }
  };

  useEffect(() => {
    if (!projectData || projectData._id !== projectId) {
      dispatch(getProject(projectId));
    }
    window.scrollTo(0, 0);
  }, [dispatch, projectId, projectData]);

  const formatDescription = (description) => {
    return description.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  if (!projectData) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-gray-700">
        Loading project data...
      </div>
    );
  }

  const descriptionLimit = window.innerWidth >= 640 ? 500 : 300; // Adjust limit based on device size
  const truncatedDescription =
    projectData.description.length > descriptionLimit
      ? `${projectData.description.substring(0, descriptionLimit)}...`
      : projectData.description;

  const bioLimit = window.innerWidth >= 640 ? 400 : 200; // Adjust limit based on device size
  const truncatedBio =
    projectData.authorId.bio.length > bioLimit
      ? `${projectData.authorId.bio.substring(0, bioLimit)}...`
      : projectData.authorId.bio;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <div className="bg-white shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src={projectData.thumbnail}
              alt={projectData.projectName}
              className="w-full h-44 sm:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h1 className="text-2xl text-center sm:text-4xl font-bold text-white">
                {projectData.projectName}
              </h1>
            </div>
          </div>
          <div className="p-3 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                {projectData.logo ? (
                  <img
                    src={projectData.logo}
                    alt="Project Logo"
                    className="w-10 h-10"
                  />
                ) : (
                  <img
                    src="/image.png"
                    alt="Project Logo"
                    className="w-10 h-10"
                  />
                )}
                <span className="text-lg sm:text-xl font-semibold">
                  {projectData.projectName}
                </span>
              </div>
              <button
                onClick={handleLikeClick}
                className={`flex items-center space-x-1 transition-transform ${
                  liked ? "text-blue-500 scale-110" : "text-gray-500"
                } hover:text-blue-500`}
              >
                <ThumbUpAltIcon />
                <span>{projectData.projectLikes.length}</span>
              </button>
            </div>
            <div className="text-gray-600 mb-4">
              {showFullDescription ? (
                <span>
                  {formatDescription(projectData.description)}
                  <button
                    onClick={() => setShowFullDescription(false)}
                    className="text-gray-500"
                  >
                    Show Less <ExpandLessIcon />
                  </button>
                </span>
              ) : (
                <span>
                  {formatDescription(truncatedDescription)}
                  {projectData.description.length > descriptionLimit && (
                    <button
                      onClick={() => setShowFullDescription(true)}
                      className="text-gray-500"
                    >
                      Show More <ExpandMoreIcon />
                    </button>
                  )}
                </span>
              )}
            </div>
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
                  No link available, contact the creator.
                </p>
              )}
            </div>
            <div className="border-t pt-4">
              <h2 className="text-xl font-semibold mb-2">Project Images</h2>
              <ImageCarousel images={projectData.images} />
            </div>
          </div>
        </div>

        {/* About the creator section */}
        <div className="mt-8 bg-white shadow-lg p-3 sm:p-6">
          <h2 className="text-2xl font-semibold mb-4">About the Creator</h2>
          <div className="flex items-center space-x-4">
            <img
              src={projectData.authorId.profileImage}
              alt={projectData.authorId.username}
              className="w-16 h-16"
            />
            <div>
              <h3 className="text-xl font-semibold">
                {projectData.authorId.username}
              </h3>
              <p className="text-gray-600">{projectData.authorId.headline}</p>
            </div>
          </div>
          <p className="mt-4 text-gray-700">
            {showFullBio ? (
              <span>
                {formatDescription(projectData.authorId.bio)}
                <button
                  onClick={() => setShowFullBio(false)}
                  className="text-gray-500"
                >
                  Show Less <ExpandLessIcon />
                </button>
              </span>
            ) : (
              <span>
                {formatDescription(truncatedBio)}
                {projectData.authorId.bio.length > bioLimit && (
                  <button
                    onClick={() => setShowFullBio(true)}
                    className="text-gray-500"
                  >
                    Show More <ExpandMoreIcon />
                  </button>
                )}
              </span>
            )}
          </p>
          <Link
            to={`/profile/${projectData.authorId._id}`}
            className="mt-2 text-blue-600 cursor-pointer"
          >
            View {projectData.authorId.username}'s profile <LinkIcon />
          </Link>
        </div>

        <div className="mt-8 bg-white shadow-lg p-2 sm:p-6">
          <Discussions
            projectId={projectData._id}
            authorId={projectData.authorId}
          />
        </div>
      </div>
    </div>
  );
}
