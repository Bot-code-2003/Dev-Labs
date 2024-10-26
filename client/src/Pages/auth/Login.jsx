import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../actions/user";
import Nebula from "../../assets/nebula.jpeg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading
    console.log("Form submitted:", formData);

    try {
      await dispatch(login(formData, navigate)); // Assuming login returns a promise
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <Link to="/" className="block relative mb-6 overflow-hidden group">
            <img
              src={Nebula}
              className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
              alt="Dev Labs"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 flex items-center justify-center group-hover:bg-opacity-40">
              <h1 className="text-4xl text-white font-bold font-mono">
                Dev Labs
              </h1>
            </div>
          </Link>

          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            Login to your account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              {/* <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div> */}
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                disabled={loading} // Disable button while loading
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12c0-1.1.9-2 2-2h3c1.1 0 2 .9 2 2s-.9 2-2 2H6c-1.1 0-2-.9-2-2zm16 0c0-1.1-.9-2-2-2h-3c-1.1 0-2 .9-2 2s.9 2 2 2h3c1.1 0 2-.9 2-2z"
                      ></path>
                    </svg>
                    Logging In...
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out"
            >
              Sign up
            </Link>
          </p>
        </div>
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${Nebula})` }}
        >
          <div className="h-full w-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-12">
            <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-xl text-center mb-6">
              Log in to access your Dev Labs account.
            </p>
            <ul className="list-disc list-inside text-left">
              <li className="mb-2">Access your profile</li>
              <li className="mb-2">Connect with your developer network</li>
              <li>Stay updated with the latest in projects</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
