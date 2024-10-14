import React, { useState } from "react";
import Compressor from "compressorjs";
import AddPhotoAlternateSharpIcon from "@mui/icons-material/AddPhotoAlternateSharp";

const ThumbnailInput = ({ setProjectThumbnail }) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0]; // Single file for thumbnail
    if (!file) return;

    const sizeInKB = (file.size / 1024).toFixed(2);
    new Compressor(file, {
      quality: sizeInKB > 500 ? 0.2 : 0.5,
      success: (compressedImage) => {
        const reader = new FileReader();
        reader.onload = () => {
          setThumbnail(reader.result);
          setProjectThumbnail(reader.result);
          setUploadStatus("success");
        };
        reader.readAsDataURL(compressedImage);
      },
      error: () => setUploadStatus("error"),
    });
  };

  const handleReset = () => {
    setThumbnail(null);
    setUploadStatus("");
    setProjectThumbnail(null);
  };

  return (
    <div className="flex flex-col gap-3 text-gray-500 border border-gray-300 p-3">
      <div className="flex items-center justify-between">
        <label
          htmlFor="thumbnail-input"
          className="flex items-center gap-2 cursor-pointer"
        >
          <AddPhotoAlternateSharpIcon className="text-gray-500" />
          <span>
            {thumbnail ? "Thumbnail Uploaded" : "Upload Thumbnail (required)"}
          </span>
        </label>
        {thumbnail && (
          <button
            className="text-red-400 hover:text-red-600"
            onClick={handleReset}
          >
            Remove
          </button>
        )}
      </div>
      <input
        id="thumbnail-input"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleThumbnailUpload}
      />
      {thumbnail && (
        <div className="border border-gray-400 mt-2">
          <img src={thumbnail} alt="Thumbnail Preview" className="w-[200px]" />
        </div>
      )}
    </div>
  );
};

export default ThumbnailInput;
