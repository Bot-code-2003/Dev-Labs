import React, { useState } from "react";
import PublishIcon from "@mui/icons-material/Publish";
import { useDispatch } from "react-redux";
import { submitProject } from "../actions/project";
import { useNavigate } from "react-router-dom";
import FileInput from "../components/FileInput"; // Import FileInput

const compressImage = (file, quality) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
    };
    reader.readAsDataURL(file);
  });
};

const getCompressionQuality = (size) => {
  if (size > 1 * 1024 * 1024) return 0.5; // Greater than 1MB, high compression
  if (size > 500 * 1024) return 0.8; // Greater than 500KB, 80% quality
  if (size > 100 * 1024) return 0.3; // Greater than 100KB, 30% quality
  return 0.1; // Less than 100KB, 10% quality
};

const resizeLogo = async (file) => {
  const quality = 0.1; // Adjust as needed for logo compression
  const compressed = await compressImage(file, quality);
  return compressed;
};

export default function ShareProject() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authorId = JSON.parse(localStorage.getItem("user")).userId;

  const [projectData, setProjectData] = useState({
    projectName: "",
    projectType: "Website",
    tagline: "",
    description: "",
    link: "",
    thumbnail: "",
    images: [],
    logo: "",
    authorId: authorId,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const compressedThumbnail = await compressImage(
        file,
        getCompressionQuality(file.size)
      );
      setProjectData((prevData) => ({
        ...prevData,
        thumbnail: compressedThumbnail,
      }));
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files); // Allow multiple images
    const imagePromises = files.map(async (file) => {
      const compressedImage = await compressImage(
        file,
        getCompressionQuality(file.size)
      );
      return compressedImage;
    });

    const images = await Promise.all(imagePromises);
    setProjectData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...images], // Append new images
    }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const resizedLogo = await resizeLogo(file);
      setProjectData((prevData) => ({
        ...prevData,
        logo: resizedLogo,
      }));
    }
  };

  const validateInputs = () => {
    const { projectName, tagline, description, images, thumbnail } =
      projectData;

    if (!projectName || !tagline || !description || !thumbnail) {
      setPopupMessage("All fields must be filled out, including logo.");
      return false;
    }

    if (images.length === 0) {
      setPopupMessage("Please upload at least one project image.");
      return false;
    }

    return true;
  };

  const handlePublish = () => {
    if (!validateInputs()) {
      setShowPopup(true);
      return;
    }

    setIsSubmitting(true);
    console.log(projectData);

    setTimeout(() => {
      dispatch(submitProject(projectData))
        .then(() => {
          setIsSubmitting(false);
          navigate("/projects"); // Call navigate after successful submission
        })
        .catch(() => {
          setIsSubmitting(false);
        });
    }, 2000);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...projectData.images];
    updatedImages.splice(index, 1);
    setProjectData((prevData) => ({
      ...prevData,
      images: updatedImages,
    }));
  };

  const [showWarning, setShowWarning] = useState(true);

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      {showWarning && (
        <div className="fixed top-10 left-[50%] transform -translate-x-1/2 min-w-[300px] py-4 z-50 px-8 bg-gradient-to-r from-red-500 via-red-400 to-red-500 text-white mb-4 ">
          <h1>
            Warning : Once submitted project cant be edited. You can only delete
            the project
          </h1>
          <button
            onClick={() => setShowWarning(false)}
            className="absolute top-2 right-2 text-white text-sm"
          >
            {" "}
            X
          </button>
        </div>
      )}
      <div className="max-w-7xl mx-auto bg-gray-100 dark:bg-gray-300 shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 p-6">
          <h1 className="text-2xl font-bold text-white">
            Showcase your Best work to the world
          </h1>
        </div>

        <div className="p-6">
          <form className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="projectName"
              >
                Project Name (Required)
              </label>
              <input
                id="projectName"
                name="projectName"
                value={projectData.projectName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your project name"
                required
              />
            </div>

            {/* * Project Type select */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="projectType"
              >
                Project Type (Required)
              </label>
              <select
                id="projectType"
                name="projectType"
                value={projectData.projectType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a project type</option>
                <option value="Website">Website</option>
                <option value="Android App">Android App</option>
                <option value="IOS App">IOS App</option>
                <option value="Mobile App">Mobile App</option>
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="tagline"
              >
                Tagline (Required)
              </label>
              <input
                id="tagline"
                name="tagline"
                value={projectData.tagline}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter a short tagline"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="description"
              >
                Description (Required)
              </label>
              <textarea
                id="description"
                name="description"
                value={projectData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter a detailed description"
                rows={4}
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="link"
              >
                Related Link (e.g., GitHub, live demo) (Optional)
              </label>
              <input
                id="link"
                name="link"
                value={projectData.link}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter related link."
              />
            </div>

            <div>
              <FileInput
                label="Logo (250x250px recommended)"
                id="logo-upload"
                accept="image/*"
                onChange={handleLogoUpload}
              />
              {projectData.logo && (
                <img
                  src={projectData.logo}
                  alt="Logo"
                  className="h-16 w-16 object-cover mt-2"
                />
              )}
            </div>
            <div>
              <FileInput
                label="Thumbnail"
                id="thumbnail-upload"
                accept="image/*"
                onChange={handleThumbnailUpload}
              />
              {projectData.thumbnail && (
                <img
                  src={projectData.thumbnail}
                  alt="Thumbnail"
                  className="h-[150px] sm:h-[250px] w-full object-cover mt-4"
                />
              )}
            </div>

            <div>
              <FileInput
                label="Project Images"
                id="images-upload"
                accept="image/*"
                onChange={handleImageUpload}
                multiple // Allow multiple images to be uploaded
              />
              {projectData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {projectData.images.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image}
                        alt={`Project Image ${index + 1}`}
                        className="h-[150px] sm:h-[250px] w-full object-cover"
                      />
                      <p onClick={() => handleDeleteImage(index)}>Delete</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handlePublish}
                disabled={isSubmitting}
                className={`flex items-center gap-1 px-4 py-2 border border-transparent shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  "Publishing..."
                ) : (
                  <>
                    <PublishIcon /> Publish
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-bold mb-4">Missing Information</h2>
            <p>{popupMessage}</p>
            <button
              onClick={closePopup}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
