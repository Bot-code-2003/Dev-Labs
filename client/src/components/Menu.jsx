import React from "react";

const Menu = ({ handleLogout }) => {
  return (
    <div className="relative group z-50">
      {/* Main Menu Item */}
      <button className="flex items-center text-gray-700 hover:text-blue-600 focus:outline-none">
        Profile
      </button>

      {/* Dropdown Menu */}
      <div className="absolute -left-10 hidden bg-white border p-2 shadow-md group-hover:block">
        <ul className="flex flex-col">
          <li className="hover:bg-gray-100">
            <p
              onClick={handleLogout}
              className="block px-4 py-2 cursor-pointer text-gray-700"
            >
              Logout
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
