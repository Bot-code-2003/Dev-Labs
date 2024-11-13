import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../../actions/user";
import Nebula from "../../assets/nebula.jpeg";
import SkillsInput from "../../components/SkillsInput";
import TextInput from "../../components/TextInput";
import SelectInput from "../../components/SelectInput";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          canvas.width = 250;
          canvas.height = 250;
          ctx.drawImage(img, 0, 0, 250, 250);

          // Determine the initial quality based on file size
          let quality = 1.0;
          let dataURL = canvas.toDataURL("image/jpeg", quality);

          // Apply compression based on thresholds
          if (file.size > 1024 * 1024) {
            quality = 0.3; // 95% compression for files larger than 1 MB
          } else if (file.size > 500 * 1024) {
            quality = 0.3; // 90% compression for files larger than 500 KB
          } else if (file.size > 20 * 1024) {
            quality = 0.3; // 70% compression for files larger than 20 KB
          } else {
            quality = 0.7; // 30% compression for smaller files
          }

          // Compress image to the selected quality
          dataURL = canvas.toDataURL("image/jpeg", quality);

          setFormData({ ...formData, profileImage: dataURL });
        };
      };
    }
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    headline: "",
    bio: "",
    password: "",
    profileImage: null,
    identity: "Frontend Developer",
    skills: "",
    currentPosition: "Student", // Default value as "Student"
    college: "G. Pulla Reddy Engineering College", // Default college
    nation: "India", // Default nation
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted:", formData);
    try {
      setLoading(true);
      await dispatch(signup(formData, navigate));
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
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

            <TextInput
              label="Username"
              id="username"
              name="username"
              placeholder="Choose a unique username"
              required
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <TextInput
              label="Email address"
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <TextInput
              label="Headline"
              id="headline"
              name="headline"
              placeholder="e.g., Full Stack Developer"
              required
              value={formData.headline}
              onChange={(e) =>
                setFormData({ ...formData, headline: e.target.value })
              }
            />
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Bio
              </label>
              <textarea
                id="bio"
                rows="4"
                name="bio"
                className="w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                placeholder="Write a short bio about yourself"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                required
              ></textarea>
            </div>
            <TextInput
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="Create a strong password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {/* <SelectInput
              label="Your Identity"
              id="identity"
              name="identity"
              options={[
                "Frontend Developer",
                "Backend Developer",
                "Full-stack Developer",
                "Mern-stack Developer",
                "Mobile App Developer",
                "iOS Developer",
                "Android Developer",
                "React Native Developer",
                "Flutter Developer",
                "A random developer",
                ,
              ]}
              required
              value={formData.identity}
              onChange={(e) =>
                setFormData({ ...formData, identity: e.target.value })
              }
            /> */}
            {/* <TextInput
              label="Skills"
              id="skills"
              name="skills"
              type="text"
              placeholder="Enter the skills you're interested in"
              value={formData.skills}
              required
              onChange={(e) =>
                setFormData({ ...formData, skills: e.target.value })
              }
            /> */}
            {/* <SelectInput
              label="Current Position"
              id="currentPosition"
              name="currentPosition"
              options={["Student", "Developer", "Freelancer", "Other"]}
              required
              value={formData.currentPosition}
              onChange={(e) =>
                setFormData({ ...formData, currentPosition: e.target.value })
              }
            /> */}

            {/* <SelectInput
              label="College Name"
              id="college"
              name="college"
              options={[
                "Chaitanya Bharathi Institute of Technology",
                "G. Pulla Reddy Engineering College",
                "G. Pullaiah College of Engineering and Technology",
                "GITAM University",
                "IIIT Bhubaneswar",
                "MS Ramaiah Institute of Technology",
              ]}
              required
              value={formData.college}
              onChange={(e) =>
                setFormData({ ...formData, college: e.target.value })
              }
            /> */}
            {/* <p className="text-sm text-gray-700 mb-2">
              Contact if your college is not listed.{" "}
              <Link to="/contact" className="text-blue-500">
                contact
              </Link>
            </p> */}
            {/* <SelectInput
              label="Nation"
              id="nation"
              name="nation"
              options={["India"]}
              required
              value={formData.nation}
              onChange={(e) =>
                setFormData({ ...formData, nation: e.target.value })
              }
            /> */}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
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
          </div>
        </div>
      </div>
    </div>
  );
}
