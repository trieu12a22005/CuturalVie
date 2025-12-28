import React from "react";

const TooltipText = ({ text, setModal }) => {
  const handleClick = () => {
    const selection = window.getSelection();

    // ✅ FIX 1: Không có selection hoặc không có range
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    // Nếu user click nhưng không chọn text trong tooltip
    if (range.collapsed) return;

    const startNode = range.startContainer;
    const endNode = range.endContainer;

    const startElement =
      startNode instanceof Element ? startNode : startNode.parentElement;
    const endElement =
      endNode instanceof Element ? endNode : endNode.parentElement;

    let selectedText = "";
    let collecting = false;

    document.querySelectorAll(".tooltip-text").forEach((item) => {
      if (item === startElement) collecting = true;

      if (collecting) {
        // ✅ FIX 2: dùng textContent thay vì innerHTML
        selectedText += item.textContent + " ";
      }

      if (item === endElement) collecting = false;
    });

    selectedText = selectedText.trim();

    // ✅ FIX 3: không mở modal nếu không có text
    if (!selectedText) return;

    setModal(selectedText);

    // Clear selection cho UX
    selection.removeAllRanges();
  };

  return (
    <p className="relative inline-block mr-1.5 font-[lora]">
      <span className="cursor-pointer tooltip-text">{text}</span>

      <button
        type="button"
        onClick={handleClick}
        className="
          absolute bottom-full left-1/2 -translate-x-1/2 mb-2
          px-4 py-2 bg-gray-800 text-white text-sm rounded
          whitespace-nowrap select-none
        "
      >
        Hỏi AI
      </button>
    </p>
  );
};

export default TooltipText;
