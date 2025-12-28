import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import TooltipText from "../Tooltiptext";

function getToolTiptext(paragraph) {
  let words = paragraph.split(" ");
  return words.map((word, idx) => <TooltipText key={idx} text={word} />);
}

const LearningInfo = ({ text, setChatdata }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    const handleMouseUp = (e) => {
      setTimeout(() => {
        const selection = window.getSelection();
        const selectedStr = selection.toString().trim();

        if (!selectedStr || selection.rangeCount === 0) {
          setShowButton(false);
          return;
        }

        const range = selection.getRangeAt(0);
        if (range.collapsed) {
          setShowButton(false);
          return;
        }

        const startElement = range.startContainer.parentElement;
        const endElement = range.endContainer.parentElement;

        // Kiểm tra xem selection có trong tooltip-text không
        const isInsideTooltip =
          startElement?.closest(".tooltip-text") ||
          endElement?.closest(".tooltip-text");

        if (!isInsideTooltip) {
          setShowButton(false);
          return;
        }

        // Lưu text được chọn
        setSelectedText(selectedStr);

        // Tính toán vị trí button dựa trên vị trí selection
        const rect = range.getBoundingClientRect();
        console.log(rect,e)
        setButtonPosition({
          top: rect.top- 140,
          left: rect.left + rect.width / 2,
        });

        setShowButton(true);
      }, 10);
    };

    const handleMouseDown = (e) => {
      // Nếu click vào button thì không làm gì
      if (e.target.closest(".ai-ask-button")) return;
      setShowButton(false);
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const handleAskAI = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedText) {
      setChatdata(selectedText);
      setShowButton(false);
      window.getSelection().removeAllRanges();
    }
  };

  const nextContent = () => {
    if (currentIndex < text.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevContent = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative mr-4">
      <img src="/information_1/Group_7.png" alt="" />
      <div className="p-4 text-gray-800 text-[15px] absolute top-3 w-full overflow-hidden">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: direction * 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <h3 className=" mt-[20px]  font-bold text-lg">
            {text[currentIndex].heading}
          </h3>
          <ul className="list-disc pl-6 space-y-2 break-words">
            {text[currentIndex].content.map((item, i) => (
              <li key={item.id} className="break-words">{getToolTiptext(item.paragraph)}</li>
            ))}
          </ul>
        </motion.div>

        {/* Navigation buttons */}
      </div>
      <div className="flex justify-center gap-4 mt-auto absolute bottom-3 left-1/2 -translate-x-1/2">
        <button
          onClick={prevContent}
          disabled={currentIndex === 0}
          className={`p-2 border rounded-full ${
            currentIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextContent}
          disabled={currentIndex === text.length - 1}
          className={`p-2 border rounded-full ${
            currentIndex === text.length - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* AI Button - chỉ 1 button duy nhất cho toàn bộ selection */}
      {showButton && (
        <button
          type="button"
          onClick={handleAskAI}
          onMouseDown={(e) => e.preventDefault()}
          className="ai-ask-button absolute z-[9999] px-4 py-2 bg-gray-800 text-white text-sm rounded whitespace-nowrap hover:bg-gray-700 shadow-lg pointer-events-auto"
          style={{
            position: 'fixed',
            top: `${buttonPosition.top}px`,
            left: `${buttonPosition.left}px`,
            transform: "translateX(-120%)",
          }}
        >
          Hỏi AI
        </button>
      )}
    </div>
  );
};

export default LearningInfo;
