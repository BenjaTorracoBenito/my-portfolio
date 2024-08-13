import { useState, useEffect } from "react";

export function Counter({ numColors, onNumColorsChange, handleColorChange }) {
  useEffect(() => {
    if (numColors < 2) {
      onNumColorsChange(2);
    } else if (numColors > 8) {
      onNumColorsChange(8);
    }
  }, [numColors, onNumColorsChange]);

  const decrement = () => onNumColorsChange(Math.max(2, numColors - 1));
  const increment = () => onNumColorsChange(Math.min(8, numColors + 1));

  return (
    <div className="grid grid-cols-3 place-items-center text-xl bold text-white">
      <span
        className="w-10 flex justify-center items-center aspect-square rounded-full bg-blue-500 text-center hover:bg-purple-500"
        onClick={decrement}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
        </svg>
      </span>
      <span className="w-10 h-10 leading-10 num place-self-center bg-white rounded-xl text-blue-500 text-center">
        {numColors}
      </span>
      <span
        className="w-10 flex justify-center items-center aspect-square rounded-full bg-blue-500 text-center hover:bg-purple-500 "
        onClick={increment}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </span>
    </div>
  );
}
