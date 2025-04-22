import React from 'react';

const TooltipText = ({ text}) => {
  return (
    <p className="relative inline-block mr-1.5">
      <span className="cursor-pointer tooltip-text">{text}</span>
        <div className="absolute select-none bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap hidden">
          ask AI
        </div>
    </p>
  );
};

export default TooltipText;
