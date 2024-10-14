import React, { useState } from "react";
import Nebula from "../../assets/nebula.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../actions/user";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    dispatch(login(formData, navigate));
  };
  return (
    <div className="flex justify-start mt-10 items-center h-auto flex-col gap-5">
      {/* <h1 className="text-3xl font-bold font-mono text-gray-500">Welcome</h1> */}
      <div className="relative mb-5">
        <img src={Nebula} className="w-[300px] h-[100px]" alt="Nebula Labs" />
        <div className="absolute inset-0 bg-black opacity-15"></div>{" "}
        {/* Dark overlay */}
        <h1 className="absolute inset-0 flex items-center justify-center text-3xl text-white font-bold font-mono">
          Nebula Labs
        </h1>
      </div>

      <h1 className="text-3xl font-mono text-gray-500">Login</h1>

      <form
        className="min-w-[300px] flex flex-col justify-center items-center gap-8"
        onSubmit={handleSubmit}
      >
        <input
          className="font-mono border-b-2 bg-transparent w-full pb-1 outline-none"
          name="email"
          type="email"
          placeholder="email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          value={formData.email}
        />

        <input
          placeholder="password"
          className="font-mono bg-transparent border-b-2 w-full pb-1 outline-none"
          name="password"
          type="password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          value={formData.password}
        />

        <button
          className="bg-purple-400 text-white py-2 px-4 rounded-full shadow-lg w-full hover:bg-purple-500 transition-colors duration-300 "
          type="submit"
        >
          Login
        </button>
      </form>
      <ul>
        <li className="text-gray-400 font-mono">
          <span className="m-0">*</span> Don't have an account?{" "}
          <Link
            to={"/signup"}
            className="text-purple-400 cursor-pointer hover:text-purple-500 transition-colors duration-200"
          >
            Sign up
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Login;
