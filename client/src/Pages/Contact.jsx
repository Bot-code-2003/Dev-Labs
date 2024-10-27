import React from "react";

export default function ContactUs() {
  return (
    <section className="font-sans text-gray-800 py-16 px-6 md:px-12">
      <h1 className="text-5xl font-extrabold mb-8 text-blue-600 text-center">
        Contact Us
      </h1>

      <p className="text-lg text-gray-600 mb-4 text-center">
        Have questions or feedback? We'd love to hear from you!
      </p>

      <h2 className="text-3xl font-bold mb-4 text-blue-600 text-center">
        Developer Information
      </h2>
      <p className="text-lg text-gray-600 text-center">
        You can reach me at:{" "}
        <a
          href="mailto:madisettydharmadeep@gmail.com"
          className="text-blue-500"
        >
          madisettydharmadeep@gmail.com
        </a>
      </p>
    </section>
  );
}
