import React from "react";
import { Routes, Route } from "react-router-dom";

import Homepage from "./Pages/Homepage";
import Navbar from "./components/Navbar";
import Login from "./Pages/auth/Login";
import SignUp from "./Pages/auth/Signup";

const App = () => {
  return (
    <div className="font-helvetica">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
