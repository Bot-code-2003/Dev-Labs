import React, { useState } from "react";
import PublishIcon from "@mui/icons-material/Publish";
import { useDispatch } from "react-redux";
import { submitProject } from "../actions/project";
import { useNavigate } from "react-router-dom";

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
  const quality = 0.8; // Adjust as needed for logo compression
  const compressed = await compressImage(file, quality);
  return compressed;
};

export default function ShareProject() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authorId = JSON.parse(localStorage.getItem("user")).userId;

  const [projectData, setProjectData] = useState({
    projectName: "",
    tagline: "",
    description: "",
    link: "",
    thumbnail: "",
    images: [],
    logo: "",
    authorId: authorId,
  });

  const [currentStep, setCurrentStep] = useState("details");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for managing popup visibility
  const [popupMessage, setPopupMessage] = useState(""); // To show custom messages for validation errors

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
    const files = Array.from(e.target.files); // No limit on images
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
      images: images,
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

    setTimeout(() => {
      dispatch(submitProject(projectData))
        .then(() => {
          setIsSubmitting(false);
          navigate("/"); // Call navigate after successful submission
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

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 p-6">
          <h1 className="text-2xl font-bold text-white">
            Showcase your Best work to the world
          </h1>
        </div>

        <div className="p-6">
          {currentStep === "details" && (
            <form className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="projectName"
                >
                  Project Name
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

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="tagline"
                >
                  Tagline
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
                  Description
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
                  Project Link
                </label>
                <input
                  id="link"
                  name="link"
                  value={projectData.link}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter project link (e.g., GitHub, live demo)"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep("images")}
                  className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Next
                </button>
              </div>
            </form>
          )}

          {currentStep === "images" && (
            <div className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="logo"
                >
                  Logo (250x250px recommended)
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  <label
                    htmlFor="logo-upload"
                    className="cursor-pointer bg-white py-2 px-3 border border-gray-300 shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Choose Logo
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="sr-only"
                    />
                  </label>
                  {projectData.logo && (
                    <img
                      src={projectData.logo}
                      alt="Logo"
                      className="h-16 w-16 object-cover"
                    />
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  <label
                    htmlFor="thumbnail-upload"
                    className="cursor-pointer bg-white py-2 px-3 border border-gray-300 shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Choose Thumbnail
                    <input
                      id="thumbnail-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      className="sr-only"
                    />
                  </label>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {projectData.thumbnail && (
                    <img
                      src={projectData.thumbnail}
                      alt="Thumbnail"
                      className="h-[150px] sm:h-[250px] w-full object-cover"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Images
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  <label
                    htmlFor="images-upload"
                    className="cursor-pointer bg-white py-2 px-3 border border-gray-300 shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Choose Images
                    <input
                      id="images-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="sr-only"
                    />
                  </label>
                </div>
                {projectData.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {projectData.images.map((image, index) => (
                      <div>
                        <img
                          key={index}
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

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep("details")}
                  className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Back
                </button>
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
            </div>
          )}
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
