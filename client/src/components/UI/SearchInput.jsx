import { FiSearch } from "react-icons/fi";

const SearchInput = ({ value, onChange, placeholder = "Search books..." }) => {
  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
        <FiSearch className="text-lg" />
      </span>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          pl-11 pr-4 py-2.5
          rounded-md
          shadow-sm
          bg-white
          border border-gray-300
          placeholder-gray-400
          text-sm
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          transition duration-200
        "
      />
    </div>
  );
};

export default SearchInput;
