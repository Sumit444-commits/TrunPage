import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaBookOpen,
  FaLinkedin,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

const social = [
  {
    name: "Instagram",
    to: "https://www.instagram.com/codes.software?igsh=bXE2a3d0cnZqc3Fr",
    item: <FaInstagram />,
    className:
      "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white rounded-sm",
  },
  {
    name: "Facebook",
    to: "https://www.facebook.com/profile.php?id=100041368329376",
    item: <FaFacebookF />,
    className: "text-[#1877F2] hover:text-blue-700",
  },
  {
    name: "Github",
    to: "https://github.com/Sumit444-commits",
    item: <FaGithub />,
    className: "text-[#333333] hover:text-black",
  },
  {
    name: "Instagram",
    to: "https://www.linkedin.com/in/sumit-sharma-a8269b25b/",
    item: <FaLinkedinIn />,
    className: "text-[#0A66C2] hover:text-blue-800",
  },
];

const quickLinks = [
  { name: "Home", to: "/" },
  { name: "Books", to: "/books" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
];
const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-800 pt-12 pb-6 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + Brand Message */}
        <div>
          <Link
            to="/"
            className="text-2xl font-bold flex items-center gap-2 tracking-wider text-indigo-600  transition-transform"
          >
            <FaBookOpen /> <span>TurnPage</span>
          </Link>

          <p className="mt-4 text-sm text-gray-600">
            Where books meet technology. Turn the page and unlock your next big
            idea.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase text-indigo-500">
            Quick Links
          </h4>
          <div className="flex flex-col space-y-2 text-sm">
            {quickLinks.map((item) => (
              <Link
                key={item.name}
                to={`${item.to}`}
                className="group inline-block w-fit text-gray-700 hover:text-indigo-600 transition"
              >
                <span className="link-underline">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Quote Block */}
        <div className="md:col-span-2">
          <div className="bg-white border border-indigo-100 rounded-xl p-6 shadow-sm">
            <p className="italic text-gray-600 text-sm leading-relaxed">
              "A reader lives a thousand lives before he dies. The man who never
              reads lives only one."
            </p>
            <p className="mt-3 text-right text-xs text-gray-500">
              – George R.R. Martin
            </p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="md:hidden mt-6 border-t border-gray-200 pt-6">
          <h4 className="font-semibold mb-3 text-sm uppercase text-indigo-500">
            Follow Us
          </h4>
          <div className="flex space-x-4 text-lg text-gray-600">
            {[FaFacebookF, FaTwitter, FaInstagram, FaGithub].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                className="hover:text-indigo-600 transform hover:scale-110 transition"
              >
                <Icon />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
        <span>
          &copy; {new Date().getFullYear()} TurnPage. All rights reserved.
        </span>
        <div className="hidden md:flex space-x-4 mt-4 sm:mt-0 text-lg text-gray-600">
          {social.map((Icon, i) => (
            <a
              key={i}
              href={Icon.to}
              target="_blank"
              className={`${Icon.className} transform hover:scale-110 transition`}
            >
              {Icon.item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
