import React from "react";

const Square = ({ value, onClick }) => {
  return (
    <button
      className="w-16 h-16 border-2 border-gray-500 flex items-center justify-center text-2xl"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
