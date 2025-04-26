import React from "react";

const TooltipText = ({ text, setModal }) => {
  let handleClick = () => {
    const selection = window.getSelection();
    if (!selection) return
    const range = selection.getRangeAt(0);
    const startNode = range.startContainer;
    const startElement =startNode instanceof Element ? startNode : startNode.parentElement;
    const endNode = range.endContainer;
    const endElement = endNode instanceof Element ? endNode : endNode.parentElement;
    console.log(startNode,endNode);
    let selectedText = "";
    let stop = false;
    document.querySelectorAll(".tooltip-text").forEach((item) => {
      if (stop) return;
      if (selectedText || item == startElement) {
        selectedText += item.innerHTML+" ";
      }
      if (item == endElement) stop = true;
    });
    console.log(selectedText);
   setModal(selectedText.trim());
    selection.removeAllRanges();
  };

  return (
    <p className="relative inline-block mr-1.5 font-[lora]">
      <span className="cursor-pointer tooltip-text">{text}</span>
      <button
        onClick={handleClick}
        className="absolute select-none bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 bg-gray-800 text-white text-sm rounded whitespace-nowrap hidden"
      >
        Hỏi AI
      </button>
    </p>
  );
};

export default TooltipText;
