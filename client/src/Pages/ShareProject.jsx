import React, { useState } from "react";
import PublishIcon from "@mui/icons-material/Publish";

export default function ShareProject() {
  const [projectData, setProjectData] = useState({
    projectName: "",
    tagline: "",
    description: "",
    link: "",
    thumbnail: "",
    images: [],
  });

  const [currentStep, setCurrentStep] = useState("details");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProjectData((prevData) => ({
          ...prevData,
          thumbnail: event.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 3); // Limit to 3 images
    const imagePromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then((images) => {
      setProjectData((prevData) => ({
        ...prevData,
        images: images,
      }));
    });
  };

  const handlePublish = () => {
    setIsSubmitting(true);
    // Simulating an API call
    setTimeout(() => {
      console.log("Project Data:", projectData);
      setIsSubmitting(false);
      // Here you would typically handle the response, show a success message, etc.
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 p-6">
          <h1 className="text-2xl font-bold text-white">Share Your Project</h1>
          <p className="mt-2 text-blue-100">Showcase your work to the world</p>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail (250x250px recommended)
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
                  {projectData.thumbnail && (
                    <img
                      src={projectData.thumbnail}
                      alt="Thumbnail"
                      className="h-16 w-16 object-cover"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Images (3 max)
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
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {projectData.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Project Image ${index + 1}`}
                        className="h-24 w-full object-cover"
                      />
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
                  {isSubmitting ? "Publishing..." : "Publish"}
                  <PublishIcon fontSize="small" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
