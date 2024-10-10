import React, { useState } from "react";
import Nebula from "../assets/nebula.jpeg";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, IconButton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: "Web Designs", link: "#" },
    { text: "Web Projects", link: "#" },
    { text: "Arts", link: "#" },
  ];

  return (
    <div className="flex justify-between font-semibold mb-2 border-b border-b-gray-200">
      {/* Nebula Background with Site Name and Menu Links */}
      <div className="flex justify-between items-center p-4 w-full">
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer relative w-[200px] h-11"
        >
          <img
            src={Nebula}
            className="absolute inset-0 w-full h-full  object-cover"
            alt="Nebula Labs"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <p className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold font-mono z-10">
            Nebula Labs
          </p>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="block md:hidden">
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <div className="flex items-center gap-5">
            {menuItems.map((item) => (
              <a
                href={item.link}
                key={item.text}
                className="text-gray-600 hover:underline transition duration-200"
              >
                {item.text}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar and Login Button */}
      <div className="hidden sm:flex items-center p-4 w-[60%] bg-white">
        <div className="flex font-normal items-center border rounded-full bg-gray-50 px-2 w-full">
          <SearchIcon className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="border-none w-full p-1 bg-gray-50 outline-none"
          />
        </div>
        <Link
          to="/auth"
          className="bg-gradient-to-r from-gray-500 to-blue-300 text-white py-1 px-4 rounded-full hover:bg-gradient-to-r hover:from-blue-300 hover:to-gray-500 transition-colors duration-200 ml-2"
        >
          Login
        </Link>
      </div>

      {/* Drawer for Mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
          onKeyDown={toggleDrawer(false)}
          className="p-2 w-64"
        >
          <IconButton onClick={toggleDrawer(false)} style={{ float: "right" }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className="font-bold mb-2">
            Nebula Labs
          </Typography>
          <div className="flex flex-col space-y-2">
            {menuItems.map((item) => (
              <a
                href={item.link}
                key={item.text}
                onClick={toggleDrawer(false)}
                className="text-gray-600"
              >
                {item.text}
              </a>
            ))}
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-md p-1 mb-2"
            />
            <Link
              to="/auth"
              className="rounded bg-gradient-to-r text-center from-gray-500 to-blue-300 text-white py-1 px-4 hover:bg-gradient-to-r hover:from-blue-300 hover:to-gray-500 transition-colors duration-200 "
            >
              Login
            </Link>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
