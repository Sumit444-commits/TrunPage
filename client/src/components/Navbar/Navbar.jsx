import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaBookOpen } from "react-icons/fa";
import "./Navbar.css";
import { useStore } from "../../store/AppContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn } = useStore();
  
  const navLinks =( isLoggedIn ? [
    { path: "/profile", label: "Profile" },
    { path: "/", label: "Home" },
    { path: "/books", label: "Books" },
    { path: "/shop", label: "Shop" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/logout", label: "Logout" },
  ] : [
    { path: "/", label: "Home" },
    { path: "/books", label: "Books" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/login", label: "Login" },
    { path: "/register", label: "Register" },
  ])


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="font-bold flex items-center gap-2 text-3xl text-indigo-600 tracking-wide hover:scale-105 transition-transform"
        >
          <FaBookOpen /> <span>TurnPage</span>
          {/* <img src="/logodark.png" className='max-h-14' alt="logo" /> */}
        </Link>

        {/* Dropdown Button */}
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="px-5 py-2 text-gray-800 font-semibold rounded-full border border-gray-300 flex items-center gap-2 shadow-sm hover:bg-gray-100 transition-all"
          >
            <span className="tracking-wide">Menu</span>
            {isMenuOpen ? (
              <XMarkIcon className="w-5 h-5 animate-spin-slow" />
            ) : (
              <Bars3Icon className="w-5 h-5 animate-fade-in" />
            )}
          </button>

          {/* Dropdown menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-2xl ring-1 ring-black/10 animate-scale-fade z-40">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-5 py-3 text-base font-medium transition-colors duration-200 rounded-lg ${
                      isActive
                        ? "bg-indigo-100 text-indigo-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
