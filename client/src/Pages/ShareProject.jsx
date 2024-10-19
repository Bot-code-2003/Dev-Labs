import React, { useEffect, useState } from "react";
import LinkIcon from "@mui/icons-material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import TerminalSharpIcon from "@mui/icons-material/TerminalSharp";
import FolderSharedSharpIcon from "@mui/icons-material/FolderSharedSharp";
import ThumbnailInput from "../components/ThumbnailInput";
import ImageInput from "../components/ImageInput";
import { useNavigate } from "react-router-dom";
import { submitProject } from "../actions/project";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";

const ShareProject = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("user"))) {
      window.location.href = "/login";
    }
  }, []);

  const user =
    JSON.parse(localStorage.getItem("user"))?.name.charAt(0).toUpperCase() +
    JSON.parse(localStorage.getItem("user"))?.name.slice(1);

  const [projectData, setProjectData] = useState({
    projectName: "",
    projectDescription: "",
    projectURL: "",
    githubURL: "",
    projectThumbnail: "",
    projectImages: [],
    techStack: "",
    author: user,
    authorImage: JSON.parse(localStorage.getItem("user"))?.authorImage,
    authorEmail: JSON.parse(localStorage.getItem("user"))?.email,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!projectData.projectThumbnail) {
      alert("Please upload a project thumbnail.");
      return;
    }
    // console.log(projectData);
    dispatch(submitProject(projectData, navigate));
  };

  return (
    <div className="p-10 m-5 shadow-md bg-white text-gray-500">
      <h1 className="text-3xl text-center ">
        Get your project ready for sharing!
      </h1>
      <div className="flex justify-center mt-10">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col w-full sm:flex-row gap-5">
            <div>
              <span className="text-red-400 text-sm">*required</span>
              <div className="border-2 border-gray-300 flex items-center px-2">
                <FolderSharedSharpIcon />
                <input
                  required
                  name="projectName"
                  type="text"
                  placeholder="Project Name"
                  className="w-full p-2 outline-none min-w-[250px]"
                  value={projectData.projectName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <span className="text-red-400 text-sm">*required</span>
              <div className="border-2 border-gray-300 flex items-center px-2">
                <LinkIcon />
                <input
                  required
                  name="projectURL"
                  type="text"
                  placeholder="Project URL"
                  className="w-full p-2 outline-none min-w-[250px]"
                  value={projectData.projectURL}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-5 mt-5">
            <div className="border-2 border-gray-300 flex items-center px-2">
              <GitHubIcon />
              <input
                name="githubURL"
                type="text"
                placeholder="GitHub URL"
                className="w-full p-2 outline-none min-w-[250px]"
                value={projectData.githubURL}
                onChange={handleInputChange}
              />
            </div>
            <div className="border-2 border-gray-300 flex items-center px-2">
              <TerminalSharpIcon />
              <input
                name="techStack"
                type="text"
                placeholder="Tech Stack (comma separated)"
                className="w-full p-2 outline-none min-w-[250px]"
                value={projectData.techStack}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    techStack: e.target.value.replace(/\s+/g, ""),
                  })
                }
              />
            </div>
          </div>

          {/* Taking image as thumbnail */}
          <div className="mt-5">
            <span className="text-red-400 text-sm">*required</span>
            <ThumbnailInput
              setProjectThumbnail={(thumbnail) =>
                setProjectData({ ...projectData, projectThumbnail: thumbnail })
              }
            />
          </div>

          {/* Taking multiple images */}
          <div className="mt-5">
            <ImageInput
              setProjectImages={(images) =>
                setProjectData({ ...projectData, projectImages: images })
              }
            />
          </div>

          {/* Project Description */}
          <div className="mt-5">
            <span className="text-red-400 text-sm">*required</span>
            <div className="border-2 border-gray-300 flex items-center px-2">
              {/* <FolderSharedSharpIcon /> */}
              <textarea
                rows={5}
                required
                name="projectDescription"
                type="text"
                placeholder="Project Description"
                className="w-full p-2 outline-none min-w-[250px]"
                value={projectData.projectDescription}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200 text-white font-bold py-2 px-4 mt-5"
          >
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShareProject;
