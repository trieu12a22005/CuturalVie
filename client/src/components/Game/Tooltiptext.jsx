import React from "react";

const TooltipText = ({ text }) => {
  return (
    <span className="tooltip-text cursor-text font-[lora] select-text inline">
      {text}{" "}
    </span>
  );
};

export default TooltipText;
