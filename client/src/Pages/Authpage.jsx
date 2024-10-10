import React, { useState } from "react";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

const Authpage = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
      {isLogin ? (
        <Login setIsLogin={setIsLogin} />
      ) : (
        <Signup setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

export default Authpage;
