import React from "react";

const InputField = ({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  autoComplete ="off",
  required = false,
  className = "",
  pattern,
  ...rest
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`
          px-0 py-2 
          border-b-2 border-gray-300 
          bg-transparent 
          text-gray-800 
          placeholder-gray-400
          focus:outline-none 
          focus:border-indigo-600 
          transition 
          caret-indigo-600
          ${error ? "border-red-500 focus:border-red-500" : ""}
        `}
        {...(type === "tel" && pattern ? { pattern } : {})}
        {...rest}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
