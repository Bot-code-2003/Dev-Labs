import React, { useState } from "react";
import Nebula from "../../assets/nebula.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../../actions/user";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(formData);
    dispatch(signup(formData, navigate));
  };

  return (
    <div className="flex justify-start mt-10 items-center h-auto flex-col gap-5">
      <div className="relative mb-5">
        <img src={Nebula} className="w-[300px] h-[100px]" alt="Nebula Labs" />
        <div className="absolute inset-0 bg-black opacity-15"></div>
        <h1 className="absolute inset-0 flex items-center justify-center text-3xl text-white font-bold font-mono">
          Dev Labs
        </h1>
      </div>

      <h1 className="text-3xl font-mono text-gray-500">Sign up</h1>

      <form
        className="min-w-[300px] flex flex-col justify-center items-center gap-8"
        onSubmit={handleSubmit}
      >
        <input
          className="font-mono border-b-2 bg-transparent w-full pb-1 outline-none"
          name="firstname"
          type="text"
          placeholder="First Name"
          onChange={(e) =>
            setFormData({ ...formData, firstname: e.target.value })
          }
          value={formData.firstname}
          required
        />

        <input
          className="font-mono border-b-2 bg-transparent w-full pb-1 outline-none"
          name="lastname"
          type="text"
          placeholder="Last Name"
          onChange={(e) =>
            setFormData({ ...formData, lastname: e.target.value })
          }
          value={formData.lastname}
          required
        />

        <input
          className="font-mono border-b-2 bg-transparent w-full pb-1 outline-none"
          name="email"
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          value={formData.email}
          required
        />

        <input
          className="font-mono border-b-2 bg-transparent w-full pb-1 outline-none"
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          value={formData.password}
          required
        />

        <button
          className="bg-purple-400 text-white py-2 px-4 rounded-full shadow-lg w-full hover:bg-purple-500 transition-colors duration-300"
          type="submit"
        >
          Sign Up
        </button>
      </form>

      <ul>
        <li className="text-gray-400 font-mono">
          <span className="m-0">*</span> Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-400 cursor-pointer hover:text-purple-500 transition-colors duration-200"
          >
            Log in
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SignUp;
