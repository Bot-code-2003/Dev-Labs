import React from "react";
import moment from "moment";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import Face4Icon from "@mui/icons-material/Face4";
import { Link } from "react-router-dom";

const ProjectCard = ({ project, onClick }) => {
  return (
    <Link
      to={`/project/${project._id}`}
      onClick={onClick}
      className="block bg-white shadow-md mb-6 hover:shadow-xl "
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.thumbnail}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          alt={project.projectName}
        />
        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <h2 className="text-white text-2xl font-bold truncate">
            {project.projectName}
          </h2>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {project.authorId?.profileImage ? (
              <img
                src={project.authorId.profileImage}
                className="w-12 h-12 object-cover rounded-full"
                alt={project.authorId.username || "Author"}
              />
            ) : (
              <Face4Icon className="text-gray-500 w-12 h-12" />
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {project.authorId?.username || "Unknown Author"}
              </h3>
              <p className="text-sm text-gray-600">
                {project.authorId?.college || "College not specified"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <ThumbUpAltIcon style={{ fontSize: 18 }} />
            <span>{project.projectLikes?.length || 0} Likes</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>•</span>
            <p>{moment(project.createdAt).fromNow()}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
