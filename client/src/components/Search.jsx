import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ isMobile }) => {
  return (
    <>
      {isMobile ? (
        <div className="px-4 bg-gray-50 flex items-center border border-gray-400 overflow-hidden hover:cursor-not-allowed pointer-events-none">
          <SearchIcon className="text-gray-500" />
          <input
            type="text"
            placeholder="Search disabled"
            className="px-4 bg-gray-50 py-2 w-full outline-none"
          />
        </div>
      ) : (
        <div className="flex-1 mx-4 hidden sm:block">
          <div className="px-4 bg-gray-50 flex items-center border border-gray-400 overflow-hidden hover:cursor-not-allowed pointer-events-none">
            <SearchIcon className="text-gray-500" />
            <input
              type="text"
              placeholder="Search disabled"
              className="px-4 bg-gray-50 py-2 sm:py-3 w-full outline-none cursor-not-allowed"
              disabled
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
