import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Homepage from "./Pages/Homepage";
import Navbar from "./components/Navbar";
import Login from "./Pages/auth/Login";
import SignUp from "./Pages/auth/Signup";
import ShareProject from "./Pages/ShareProject";
import ClickedProject from "./Pages/ClickedProject";
import PersonalSpace from "./Pages/PersonalSpace";
import Connect from "./Pages/Connect";
import AuthorProfile from "./Pages/AuthorProfile";

const App = () => {
  const location = useLocation();

  // Conditionally render Navbar based on current path
  const showNavbar =
    location.pathname !== "/login" && location.pathname !== "/signup";

  return (
    <div className="font-helvetica bg-gray-50">
      {/* Render Navbar only if the path is not /login or /signup */}
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/shareproject" element={<ShareProject />} />
        <Route path="/project/:projectId" element={<ClickedProject />} />
        <Route path="/personalspace" element={<PersonalSpace />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/profile/:authorId" element={<AuthorProfile />} />
      </Routes>
    </div>
  );
};

export default App;
