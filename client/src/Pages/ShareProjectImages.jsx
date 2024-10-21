import React, { useState } from "react";

const ShareProjectImages = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);

  // Function to resize and compress the thumbnail
  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set canvas dimensions to 250x250px
          canvas.width = 250;
          canvas.height = 250;

          // Draw and resize image on canvas
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Get the resized image as DataURL
          const resizedThumbnail = canvas.toDataURL("image/jpeg", 0.5); // 50% compression
          setThumbnail(resizedThumbnail);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle image upload and compression
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 3); // Limit to 3 images
    const compressedImages = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const maxResolution = 1000; // Arbitrary resolution limit for compression
          let scale = 1;

          // Resize proportionally based on resolution
          if (img.width > maxResolution || img.height > maxResolution) {
            scale = Math.min(
              maxResolution / img.width,
              maxResolution / img.height
            );
          }

          canvas.width = img.width * scale;
          canvas.height = img.height * scale;

          // Draw the image scaled down on canvas
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Higher compression for larger images
          const compressionRatio = scale < 1 ? 0.7 : 0.9;
          const compressedImage = canvas.toDataURL(
            "image/jpeg",
            compressionRatio
          );

          compressedImages.push(compressedImage);

          if (compressedImages.length === files.length) {
            setImages(compressedImages);
          }
        };
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Share Project - Images</h2>

      {/* Thumbnail upload */}
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">
          Thumbnail (250x250px recommended)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleThumbnailUpload}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
        />
        {thumbnail && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">
              Resized Thumbnail (250x250px):
            </h4>
            <img
              src={thumbnail}
              alt="Thumbnail"
              className="w-64 h-64 object-cover"
            />
          </div>
        )}
      </div>

      {/* Images upload */}
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">
          Project Images (3 max)
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
        />
        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Project Image ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareProjectImages;
