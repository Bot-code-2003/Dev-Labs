import React, { useState, useEffect, useRef } from "react";
import TuneIcon from "@mui/icons-material/Tune";

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Filter");
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (filter) => {
    setSelectedFilter(filter);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedFilter("Filter");
    setIsOpen(false);
  };

  return (
    <div
      ref={menuRef}
      className="text-gray-500 text-sm sm:text-xl relative w-full"
    >
      <button
        className="px-4 py-2 sm:py-3 border rounded-full w-full flex gap-2 justify-center text-gray-500"
        onClick={toggleDropdown}
      >
        <TuneIcon />
        {selectedFilter}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded shadow-lg z-10">
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelect("Most recent")}
          >
            Most recent
          </div>
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelect("Most viewed")}
          >
            Most viewed
          </div>
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelect("Most liked")}
          >
            Most liked
          </div>
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={handleClear}
          >
            Clear
          </div>
        </div>
      )}
    </div>
  );
}
