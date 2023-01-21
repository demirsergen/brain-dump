import React from 'react';

const Button = ({ title, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="bg-teal-500 p-1 rounded text-teal-50 text-sm block w-full"
    >
      {title}
    </button>
  );
};

export default Button;
