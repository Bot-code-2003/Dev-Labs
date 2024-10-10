import React from "react";
import { Routes, Route } from "react-router-dom";

import Authpage from "./Pages/Authpage";
import Homepage from "./Pages/Homepage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="font-helvetica">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth" element={<Authpage />} />
      </Routes>
    </div>
  );
};

export default App;
