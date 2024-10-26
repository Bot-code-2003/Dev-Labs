import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../../actions/user";
import Nebula from "../../assets/nebula.jpeg";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    headline: "",
    bio: "",
    password: "",
    image: null,
    profileImage: null,
  });

  const [loading, setLoading] = useState(false); // Loading state

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set canvas dimensions to 250x250
          canvas.width = 250;
          canvas.height = 250;

          // Resize the image and draw it on the canvas
          ctx.drawImage(img, 0, 0, 250, 250);

          // Compress image if it exceeds 20KB
          let quality = 1.0; // 100% quality
          let dataURL = canvas.toDataURL("image/jpeg", quality);

          while (dataURL.length / 1024 > 20 && quality > 0.5) {
            quality -= 0.1;
            dataURL = canvas.toDataURL("image/jpeg", quality);
          }

          setFormData({ ...formData, image: file, profileImage: dataURL });
        };
      };
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading
    console.log("Form submitted:", formData);

    try {
      await dispatch(signup(formData, navigate)); // Assuming signup returns a promise
    } catch (error) {
      console.error("Signup error:", error);
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
            Create your account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                placeholder="Choose a unique username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
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
                htmlFor="headline"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Headline
              </label>
              <input
                id="headline"
                name="headline"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                placeholder="e.g., Full Stack Developer"
                value={formData.headline}
                onChange={(e) =>
                  setFormData({ ...formData, headline: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                placeholder="Tell us about yourself"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              ></textarea>
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
                autoComplete="new-password"
                required
                className="w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Profile Image (250 x 250 px recommended)
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                onChange={handleImageChange}
                required
              />
            </div>

            {formData.profileImage && (
              <div className="mt-4">
                <p className="text-sm text-gray-700 mb-2">Preview:</p>
                <img
                  src={formData.profileImage}
                  alt="Profile Preview"
                  className="w-64 h-64 object-cover"
                />
              </div>
            )}

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
                    Signing Up...
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out"
            >
              Log in
            </Link>
          </p>
        </div>
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${Nebula})` }}
        >
          <div className="h-full w-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-white py-12 px-8">
            <h2 className="text-4xl font-bold mb-4">Join Dev Labs</h2>
            <p className="text-xl text-center mb-6">
              Connect with developers, showcase your projects, and grow your
              skills.
            </p>
            <ul className="list-disc list-inside text-left">
              <li className="mb-2">
                Share your work and ideas with fellow developers
              </li>
              <li className="mb-2">Collaborate on cutting-edge projects</li>
              <li className="mb-2">
                Receive feedback through reviews and comments
              </li>
              <li>Track upvotes and enhance your projects</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
