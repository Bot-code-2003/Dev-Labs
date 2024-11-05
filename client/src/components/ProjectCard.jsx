import React from "react";
import moment from "moment";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import Face4Icon from "@mui/icons-material/Face4";
import { Link } from "react-router-dom";

const ProjectCard = ({ project, onClick }) => {
  return (
    <div>
      <Link
        to={`/project/${project._id}`}
        onClick={onClick}
        className="block bg-gray-200 dark:bg-gray-700 shadow-md mb-6 hover:shadow-xl dark:hover:shadow-lg hover:dark:shadow-gray-600"
      >
        <div className="relative h-56 overflow-hidden">
          <img
            src={project.thumbnail}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            alt={project.projectName}
          />
          <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-2">
            <h2 className="text-white text-xl font-bold truncate">
              {project.projectName}
            </h2>
          </div>
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              {project.authorId?.profileImage ? (
                <img
                  src={project.authorId.profileImage}
                  className="w-10 h-10 object-cover rounded-full"
                  alt={project.authorId.username || "Author"}
                />
              ) : (
                <Face4Icon className="text-gray-500 w-10 h-10" />
              )}
              <div>
                <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                  {project.authorId?.username || "Unknown Author"}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {project.authorId?.college || "College not specified"}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-1 bg-blue-200 dark:bg-blue-800 px-2 py-1 inline-block">
              {project.projectType}
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
            <div className="flex items-center space-x-1">
              <ThumbUpAltIcon style={{ fontSize: 16 }} />
              <span>{project.projectLikes?.length || 0} Likes</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>•</span>
              <p>{moment(project.createdAt).fromNow()}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
