import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";

const Error = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center px-6 py-12 text-center animate-fade-up">
      {/* Robot Image */}
      <img
        src={"/images/error404.png"}
        alt="404 Robot"
        className="w-full max-w-sm md:max-w-md animate-bounce-slow mb-10 drop-shadow-xl"
      />

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-600 mb-3 animate-fade-up delay-200 drop-shadow-md">
        404 — Page Not Found
      </h1>

      {/* Subtext */}
      <p className="text-lg text-gray-600 max-w-xl mb-10 animate-fade-up delay-300">
        The page you're looking for doesn’t exist or has been moved. But don’t worry — our robot librarian is on the case!
      </p>

      {/* Button Links */}
      <div className="flex flex-col sm:flex-row items-center gap-6 animate-fade-up delay-400">
        {/* Primary Button */}
        <Link
          to="/"
          className="group inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium text-base rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
          <FiArrowLeft className="text-lg transition-transform duration-300 group-hover:-translate-x-1" />
          Go back to home
        </Link>

        {/* Secondary Link */}
        <Link
          to="/books"
          className="group inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium text-base transition-all duration-300"
        >
          Explore books
          <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default Error;
