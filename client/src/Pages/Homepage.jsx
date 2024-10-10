import React, { useState, useEffect } from "react";
import homepageData from "../sample/homepageData.json";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Face4Icon from "@mui/icons-material/Face4";
import { useLocation } from "react-router-dom";

const Homepage = () => {
  // console.log(homepageData);

  const location = useLocation();

  useEffect(() => {
    scrollTo(0, 0);
  }, [location]);

  return (
    <div className="flex justify-center items-center h-auto flex-col p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {homepageData.map((data) => (
          <div key={data.id}>
            <div className="relative group cursor-pointer">
              <img
                src={data.projectImage}
                className="w-full h-[400px] sm:h-[315px] md:h-[270px] object-cover mb-2" // Adjusting height based on screen size
                alt={data.projectName}
              />

              <h1 className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent bg-opacity-20 flex items-center justify-center text-xl text-white font-bold font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-1/4">
                {data.projectName}
              </h1>
            </div>
            <div className="flex justify-between p-2">
              <p className="text-gray-600 font-bold text-sm flex items-center gap-1">
                <Face4Icon className="text-gray-500" fontSize="small" />
                {data.author}
              </p>
              <div className="flex gap-2">
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <ThumbUpAltIcon className="text-gray-500" fontSize="small" />
                  {data.likes}
                </p>
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <VisibilityIcon className="text-gray-500" fontSize="small" />
                  {data.views}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
