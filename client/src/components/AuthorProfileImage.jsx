import React, { useState } from "react";
import AddPhotoAlternateSharpIcon from "@mui/icons-material/AddPhotoAlternateSharp";

const AuthorProfileImage = ({ setAuthorImage }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0]; // Single file for profile picture
    if (!file) return;

    const sizeInKB = file.size / 1024; // Get the file size in KB
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        // Resize and compress the image
        compressAndResizeImage(img, sizeInKB);
      };
    };
    reader.readAsDataURL(file);
  };

  const compressAndResizeImage = (image, sizeInKB) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas size to fixed 250x250 pixels
    const WIDTH = 250;
    const HEIGHT = 250;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    // Draw the image on the canvas with fixed dimensions
    ctx.drawImage(image, 0, 0, WIDTH, HEIGHT);

    // Determine compression quality based on original file size
    let quality;
    if (sizeInKB > 1000) {
      quality = 0.2; // High compression (low quality) for large files (>1MB)
    } else if (sizeInKB > 500) {
      quality = 0.5; // Medium compression for moderately large files (500KB-1MB)
    } else {
      quality = 0.8; // Low compression (high quality) for small files (<500KB)
    }

    // Convert the canvas to a compressed image with the chosen quality
    const compressedImageDataUrl = canvas.toDataURL("image/jpeg", quality);

    // Set the compressed image in state and pass it to parent component
    setProfileImage(compressedImageDataUrl);
    setAuthorImage(compressedImageDataUrl);
    setUploadStatus("success");
  };

  const handleReset = () => {
    setProfileImage(null);
    setUploadStatus("");
    setAuthorImage(null);
  };

  return (
    <div className="flex flex-col gap-3 text-gray-500 border border-gray-300 p-3">
      <div className="flex items-center justify-between">
        <label
          htmlFor="profile-image-input"
          className="flex items-center gap-2 cursor-pointer"
        >
          <AddPhotoAlternateSharpIcon className="text-gray-500" />
          <span>
            {profileImage ? "Profile Image Uploaded" : "Upload Profile Image"}
          </span>
        </label>
        {profileImage && (
          <button
            className="text-red-400 hover:text-red-600"
            onClick={handleReset}
          >
            Remove
          </button>
        )}
      </div>
      <input
        id="profile-image-input"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleProfileImageUpload}
      />
      {profileImage && (
        <div className="border border-gray-400 mt-2">
          <img src={profileImage} alt="Profile Preview" className="w-[250px]" />
        </div>
      )}
    </div>
  );
};

export default AuthorProfileImage;
