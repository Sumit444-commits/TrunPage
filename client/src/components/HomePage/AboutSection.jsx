
import React from "react";

const AboutSection = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
        {/* Left: Image */}
        <div className="w-full">
          <img
            src={"/images/aboutSec.png"}
            alt="TurnPage About"
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />
        </div>

        {/* Right: Text */}
        <div className="text-left">
          <p className="text-sm font-semibold text-indigo-500 uppercase tracking-widest mb-2">
            About Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            We're helping readers turn pages that matter.
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            <strong>TurnPage</strong> is a modern book discovery and reading platform built for curious minds.
            We believe that the right book at the right time can change your life — and we’re here to help you find it.
          </p>
          <p className="text-gray-500">
            From intelligent recommendations and community-driven reviews to progress tracking and personal collections,
            TurnPage is designed to elevate your reading experience.
          </p>

          <a
            href="/books"
            className="inline-block mt-8 px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition"
          >
            📚 Explore Our Library
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
