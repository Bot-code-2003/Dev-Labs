import React from "react";
import bg from "../assets/svgs/about.svg";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  return (
    <section className="font-sans text-gray-800">
      {/* Header Section */}
      <header
        className="relative flex flex-col items-center text-center text-white mb-12 py-32 px-8 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/about.svg")`,
        }}
      >
        <div className="relative z-10 max-w-4xl">
          <p className="text-2xl md:text-3xl font-semibold mb-4">
            Dev Labs — Where Developers Showcase and Connect
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Share Your Projects. <br /> Advance Your Skills. <br /> Build Your
            Reputation.
          </h1>
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 "
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* About Content Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid gap-16 md:gap-24 md:grid-cols-2 py-16">
        {/* About Text */}
        <section className="text-lg text-gray-600">
          <h2 className="text-4xl font-bold mb-6 text-blue-600">
            About Dev Labs
          </h2>
          <p className="mb-4">
            Discover. Showcase. Connect. Dev Labs is a platform where developers
            can share their finest work, grow together, and elevate the
            standards of web development.
          </p>
          <p>
            Our innovative platform provides a space for developers of all
            levels to showcase their projects, receive valuable feedback, and
            connect with like-minded individuals in the tech community.
          </p>
        </section>

        {/* Our Mission Section */}
        <section className="text-lg text-gray-600">
          <h2 className="text-4xl font-bold mb-6 text-blue-600">Our Mission</h2>
          <p className="mb-4">
            At Dev Labs, we envision a world where developers at every level
            have a place to share, learn, and inspire. We are dedicated to
            building a community that values quality, creativity, and meaningful
            connections.
          </p>
          <p>
            Our goal is to foster an environment of continuous learning and
            collaboration, where developers can push the boundaries of what's
            possible in web development.
          </p>
        </section>

        {/* What We Do Section */}
        <section className="md:col-span-2">
          <div className="text-lg text-gray-600">
            <h2 className="text-4xl font-bold mb-6 text-center text-blue-600">
              What We Do
            </h2>
            <p className="mb-6">
              Dev Labs is a hub where web developers can upload their best
              projects, gather valuable feedback, and engage in discussions with
              fellow creators. Through tools like upvotes, comments, and
              replies, we foster an environment that celebrates innovation and
              encourages growth.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="bg-white p-6 shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold mb-3 text-blue-500">
                  Project Showcase
                </h3>
                <p>
                  Upload and display your best work to a community of passionate
                  developers.
                </p>
              </div>
              <div className="bg-white p-6 shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold mb-3 text-blue-500">
                  Peer Feedback
                </h3>
                <p>
                  Receive constructive feedback and insights from experienced
                  professionals.
                </p>
              </div>
              <div className="bg-white p-6 shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold mb-3 text-blue-500">
                  Community Engagement
                </h3>
                <p>
                  Engage in meaningful discussions and build lasting connections
                  in the tech world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="md:col-span-2 flex flex-col items-center text-center space-y-4 text-lg text-gray-600">
          <h2 className="text-4xl font-bold mb-6 text-center text-blue-600">
            Join Us
          </h2>
          <p className="max-w-2xl">
            Whether you're an industry expert or just getting started, Dev Labs
            welcomes you to a platform that values ingenuity, collaboration, and
            forward-thinking development. Let's build a stronger community, one
            project at a time.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8"
          >
            Get Started
          </button>
        </section>
      </div>
    </section>
  );
}
