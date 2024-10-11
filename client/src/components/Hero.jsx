import React from "react";
import Hero1 from "../assets/svgs/hero1.svg";
import Hero2 from "../assets/svgs/hero2.svg";
import Hero3 from "../assets/svgs/hero3.svg";

const Hero = () => {
  return (
    <div className="relative flex justify-center items-center p-5 text-gray-600 sm:p-20 text-center">
      <h1 className="text-xl sm:text-5xl font-bold leading-[40px] sm:leading-[55px]">
        Welcome to <span className="text-[#245bff]">Nebula Labs </span>! <br />
        Showcase your{" "}
        <span className="border-b-4 border-[#2495ff]">projects</span>,{" "}
        <span className="border-b-4 border-[#2495ff]">designs</span>, and
        <span className="border-b-4 border-[#2495ff]"> artwork</span> while
        connecting with real users who can test and provide valuable feedback.
        Join our community to enhance your creations and elevate your creative
        journey.
      </h1>

      {/* <img
        src={Hero1}
        className="absolute top-2 left-2 sm:left-8 opacity-35 h-[150px] sm:h-[200px] object-cover"
        alt="Hero Image"
      /> */}

      {/* <img
        src={Hero2}
        className="absolute bottom-8 right-8 opacity-35 h-[150px] sm:h-[300px] object-cover"
        alt="Hero Image"
      />

      <img
        src={Hero3}
        className="absolute -top-10 right-20 opacity-35 h-[150px] sm:h-[300px] object-cover"
        alt="Hero Image"
      /> */}
    </div>
  );
};

export default Hero;
