import React, { useEffect } from "react";
import bg from "../assets/svgs/about.svg";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            Dev Labs — Empowering Developers to Innovate
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Showcase Projects, <br /> Gain Insights, <br /> Forge Connections.
          </h1>
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 transition duration-300"
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
            Dev Labs is a community-driven platform where developers share
            projects, receive feedback, and engage in collaborative learning.
          </p>
          <p>
            We provide a space for tech enthusiasts at every level to gain
            exposure, hone their skills, and build their network with other
            developers.
          </p>
        </section>

        {/* Our Mission Section */}
        <section className="text-lg text-gray-600">
          <h2 className="text-4xl font-bold mb-6 text-blue-600">Our Mission</h2>
          <p className="mb-4">
            Dev Labs is on a mission to cultivate a supportive environment where
            developers grow, learn, and innovate together.
          </p>
          <p>
            We believe that by fostering a collaborative space, developers can
            drive the standards of web development forward through shared
            knowledge and meaningful connections.
          </p>
        </section>

        {/* What We Do Section */}
        <section className="md:col-span-2">
          <div className="text-lg text-gray-600">
            <h2 className="text-4xl font-bold mb-6 text-center text-blue-600">
              What We Offer
            </h2>
            <p className="mb-6">
              Dev Labs offers a suite of features for developers to engage,
              learn, and showcase their achievements. Our platform highlights
              the journey of each creator, empowering them to learn from and
              contribute to the community.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="bg-white p-6 shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold mb-3 text-blue-500">
                  Project Showcase
                </h3>
                <p>
                  Display your best projects and gain recognition within a
                  dedicated community.
                </p>
              </div>
              <div className="bg-white p-6 shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold mb-3 text-blue-500">
                  Real Feedback
                </h3>
                <p>
                  Get practical insights from fellow developers to improve and
                  refine your work.
                </p>
              </div>
              <div className="bg-white p-6 shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold mb-3 text-blue-500">
                  Collaborative Growth
                </h3>
                <p>
                  Engage with others, share experiences, and build valuable
                  professional connections.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="md:col-span-2 flex flex-col items-center text-center space-y-4 text-lg text-gray-600">
          <h2 className="text-4xl font-bold mb-6 text-center text-blue-600">
            Join Our Community
          </h2>
          <p className="max-w-2xl">
            Dev Labs is open to developers at all stages. Whether you're
            launching your first project or refining your craft, our community
            offers resources, support, and a space to connect with others in the
            tech industry.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 transition duration-300"
          >
            Get Started
          </button>
        </section>
      </div>
    </section>
  );
}
