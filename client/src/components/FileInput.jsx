// src/components/FileInput.js
import React from "react";

export default function FileInput({
  label,
  id,
  name,
  accept,
  onChange,
  multiple = false,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="file"
        accept={accept}
        onChange={onChange}
        className="w-full py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        multiple={multiple} // Allow multiple file uploads
      />
    </div>
  );
}
