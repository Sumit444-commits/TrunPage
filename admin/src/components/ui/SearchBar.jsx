// src/components/SearchBar.jsx

import { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";

const SearchBar = ({
  categories = ["All", "Free", "Paid"],
  placeholder = "Search Mockups, Logos, Design Templates...",
  onSearch,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setDropdownOpen(false);
  };

  const handleChange = (e) => {
     if (onSearch) {
      onSearch({ category: selectedCategory, term: (e.target.value) });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ category: selectedCategory, term: searchTerm });
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto relative">
      <div className="flex" ref={dropdownRef}>
        {/* Category Button */}
        <button
          type="button"
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium bg-gray-100 text-gray-800 border border-gray-300 rounded-s-md hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
        >
          {selectedCategory}
          <FiChevronDown className="ml-2" />
        </button>

        {/* Dropdown List */}
        {dropdownOpen && (
          <ul className="absolute left-0 mt-12 z-20 bg-white border rounded-md shadow w-44 dark:bg-gray-700 dark:text-white dark:border-gray-600">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() => handleCategorySelect(cat)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Search Input */}
        <div className="relative w-full">
          <input
            type="text"
            value={onSearch.term}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full p-2.5 text-sm border border-gray-300 rounded-e-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="absolute top-0 right-0 p-2.5 h-full text-white bg-blue-600 rounded-e-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <FiSearch className="w-5 h-5" />
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
