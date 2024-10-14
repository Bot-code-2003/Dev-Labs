import React, { useState } from "react";
import Compressor from "compressorjs";
import AddPhotoAlternateSharpIcon from "@mui/icons-material/AddPhotoAlternateSharp";

const ImageInput = ({ setProjectImages }) => {
  const [images, setImages] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      alert("You can only upload up to 3 images.");
      return;
    }

    const compressedImages = [];
    let processedImagesCount = 0;

    files.forEach((file) => {
      const sizeInKB = (file.size / 1024).toFixed(2);
      new Compressor(file, {
        quality: sizeInKB > 500 ? 0.2 : 0.5,
        success: (compressedImage) => {
          const reader = new FileReader();
          reader.onload = () => {
            compressedImages.push(reader.result);
            processedImagesCount++;
            if (processedImagesCount === files.length) {
              setImages(compressedImages);
              setProjectImages(compressedImages);
              setUploadStatus("success");
            }
          };
          reader.readAsDataURL(compressedImage);
        },
        error: () => setUploadStatus("error"),
      });
    });
  };

  const handleReset = () => {
    setImages([]);
    setUploadStatus("");
    setProjectImages([]);
  };

  return (
    <div className="flex flex-col gap-3 text-gray-500 border border-gray-300 p-3">
      <div className="flex items-center justify-between">
        <label
          htmlFor="images-input"
          className="flex items-center gap-2 cursor-pointer"
        >
          <AddPhotoAlternateSharpIcon className="text-gray-500" />
          <span>
            {images.length > 0
              ? "Images Uploaded"
              : "Upload up to 3 Project Images (optional)"}
          </span>
        </label>
        {images.length > 0 && (
          <button
            className="text-red-400 hover:text-red-600"
            onClick={handleReset}
          >
            Remove All
          </button>
        )}
      </div>
      <input
        id="images-input"
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={handleImagesUpload}
      />
      {images.length > 0 && (
        <div className="grid grid-cols-3 items-center gap-2 mt-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Project Image ${index + 1}`}
              className="w-[200px] object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageInput;
