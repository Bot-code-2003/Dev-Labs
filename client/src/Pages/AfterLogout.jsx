import React from "react";
import { Link } from "react-router-dom";
import bg from "../assets/background/bg.svg";

const AfterLogout = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-black"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white shadow-lg w-full max-w-4xl">
        <div className="flex flex-col md:flex-row">
          <div className="p-8 md:w-2/3">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Thank you for being a part of Dev Labs!
            </h1>
            <p className="text-gray-600 mb-4">
              We hope you enjoyed showcasing your projects and connecting with
              fellow developers. Your contributions make our community stronger
              and more vibrant.
            </p>
            <p className="text-gray-600 mb-4">
              Remember, Dev Labs is always here for you to share your latest
              work, gather feedback, and discover inspiring projects from around
              the world.
            </p>
            <p className="text-gray-600 font-semibold">
              We look forward to seeing what you'll create next!
            </p>
            {/* <div className="mt-8 text-sm text-gray-500">
              <p>Did you know?</p>
              <p className="font-semibold">
                Dev Labs has helped over 10,000 developers showcase their
                projects!
              </p>
            </div> */}
          </div>
          <div className="bg-gray-100 p-8 flex flex-col justify-center md:w-1/3">
            <Link
              to="/login"
              className="block w-full bg-blue-600 text-white px-6 py-3 text-center text-lg font-semibold hover:bg-blue-700 transition duration-300 mb-4"
            >
              Log In Again
            </Link>
            <Link
              to="/"
              className="block w-full bg-gray-300 text-gray-800 px-6 py-3 text-center text-lg font-semibold hover:bg-gray-400 transition duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfterLogout;
