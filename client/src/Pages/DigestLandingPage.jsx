import React from "react";
import about from "../assets/svgs/about.svg"; // Assuming you've placed the about.svg correctly

const DigestLandingPage = () => {
  return (
    <div className="min-h-screen text-gray-900 font-sans">
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: `url(/digestbg.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        className="relative text-white min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-blue-600 to-indigo-800"
      >
        {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up">
            Welcome to <span className="text-yellow-400">Dev Labs Digest</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-300">
            Curated content, expert advice, and tech stories to inspire and
            empower developers and entrepreneurs in a fast-paced digital world.
          </p>
          <a
            href="/digest"
            target="_blank"
            className="inline-block bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-8 py-4 text-lg font-semibold  shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up animation-delay-600"
          >
            Start Exploring
          </a>
        </div>
      </section>

      {/* What is Digest Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-8">
            What is Dev Labs Digest?
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
            Dev Labs Digest is your ultimate source for carefully curated,
            insightful content that will level up your tech journey. We empower
            developers and entrepreneurs with knowledge that accelerates growth
            and success, covering everything from coding to startup building and
            the latest in tech.
          </p>
        </div>
      </section>

      {/* About Section with Bento Grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-12 text-center">
            Why Choose Dev Labs Digest?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-200 p-8  shadow-md transition-all duration-300 hover:shadow-xl">
              <svg
                className="w-12 h-12 text-blue-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Easy to Understand
              </h3>
              <p className="text-gray-600">
                We break down complex topics into digestible, actionable
                insights.
              </p>
            </div>
            <div className="bg-gray-200 p-8  shadow-md transition-all duration-300 hover:shadow-xl">
              <svg
                className="w-12 h-12 text-green-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Practical Advice
              </h3>
              <p className="text-gray-600">
                Get hands-on tips and strategies you can apply immediately.
              </p>
            </div>
            <div className="bg-gray-200 p-8  shadow-md transition-all duration-300 hover:shadow-xl">
              <svg
                className="w-12 h-12 text-purple-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Stay Updated
              </h3>
              <p className="text-gray-600">
                Keep pace with the latest trends and innovations in tech.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Topics with Bento Grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-12">
            What We Cover
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50  overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl">
              <img
                src="https://st3.depositphotos.com/1030956/35719/v/450/depositphotos_357199414-stock-illustration-shining-light-bulb-set-icons.jpg"
                alt="Tech Insights"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-blue-700 mb-4">
                  Tech Insights
                </h3>
                <p className="text-gray-600">
                  Stay ahead of the curve with curated insights on emerging
                  technologies, trends, and new tools in the development world.
                </p>
              </div>
            </div>
            <div className="bg-gray-50  overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0dGsLjwYqtoepZW6vZySSOkHp0so8u0w_Ow&s"
                alt="Startup Stories"
                className="w-full h-48 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-green-700 mb-4">
                  Startup Stories
                </h3>
                <p className="text-gray-600">
                  Real-life stories from entrepreneurs who turned their passion
                  into successful tech startups. Get inspired and learn from
                  their journey.
                </p>
              </div>
            </div>
            <div className="bg-gray-50  overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl">
              <img
                src="https://ninjainterview.com/images/blog/live-coding-interview.png?v=1671197900125901718"
                alt="Coding Tips"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-purple-700 mb-4">
                  Coding Tips
                </h3>
                <p className="text-gray-600">
                  Improve your coding skills with advanced techniques, tips, and
                  tricks shared by industry professionals and seasoned
                  developers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Level Up Your Skills?
          </h2>
          <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of like-minded developers and entrepreneurs. Get the
            latest curated content delivered directly to you and stay ahead in
            the tech world.
          </p>
          <a
            href="/digest"
            className="inline-block bg-gray-200 text-blue-700 hover:bg-yellow-300 hover:text-blue-800 px-8 py-4 text-lg font-semibold  transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Dive Into the Digest
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg mb-4">
            Empowering developers and entrepreneurs to thrive in the digital
            world.
          </p>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Dev Labs. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DigestLandingPage;
