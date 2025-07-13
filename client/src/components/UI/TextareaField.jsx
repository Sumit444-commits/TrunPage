import React from "react";

const TextareaField = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  error,
  className = "",
  rows = 5,
  ...rest
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`mt-1 px-4 py-2 border rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
          error ? "border-red-500 focus:ring-red-500" : "border-gray-300"
        }`}
        {...rest}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TextareaField;
