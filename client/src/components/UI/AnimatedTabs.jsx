import React, { useRef, useEffect, useState } from "react";

const AnimatedTabs = ({ options = [], selected, onSelect, color = "bg-indigo-600" }) => {
  const containerRef = useRef(null);
  const [highlightStyle, setHighlightStyle] = useState({});

  useEffect(() => {
    const container = containerRef.current;
    const activeBtn = container?.querySelector(`[data-active="true"]`);
    if (activeBtn) {
      const { offsetLeft, offsetWidth } = activeBtn;
      setHighlightStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [selected]);

  return (
    <div
      ref={containerRef}
      className="relative flex rounded-full bg-gray-100 p-1 w-max mx-auto transition-all"
    >
      {/* Animated background */}
      <div
        className={`absolute h-full ${color} rounded-full transition-all duration-300 ease-in-out`}
        style={highlightStyle}
      ></div>

      {/* Buttons */}
      {options.map((option) => (
        <button
          key={option}
          data-active={selected === option}
          onClick={() => onSelect(option)}
          className={`relative z-10 px-4 py-1.5 text-sm font-medium transition-all duration-200 rounded-full ${
            selected === option
              ? "text-white"
              : "text-gray-700 hover:text-indigo-600"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default AnimatedTabs;
