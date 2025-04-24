import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import TooltipText from "../ToolTipText";

const VanMieuInfo = ({ text }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const selected = useRef();
  let [textEl, setTextel] = useState(null);
  function getToolTiptext(paragraph) {
    let words = paragraph.split(" ");
    return words.map((word, idx) => <TooltipText key={idx} text={word} />);
  }
  useEffect(() => {
    const handleSelect = () => {
      const selection = window.getSelection();
      if (selection && selection.toString()) {
        const range = selection.getRangeAt(0);
        const startNode = range.startContainer;
        const startElement =
          startNode instanceof Element ? startNode : startNode.parentElement;
        if (startElement.classList.contains("tooltip-text")) {
          selected.current = startElement;
        } else {
          selected.current = null;
          setTextel(null);
        }
      } else {
        selected.current = null;
        setTextel(null);
      }
    };

    const handleTextEl = () => {
      document.querySelectorAll(".tooltip-text").forEach((item) => {
        item.nextElementSibling?.classList.add("hidden");
      });
      document.querySelectorAll(".tooltip-text").forEach((item) => {
        if (item === selected.current) {
          item.nextElementSibling?.classList.remove("hidden");
        }
      });
    };

    document.addEventListener("selectionchange", handleSelect);
    document.addEventListener("mouseup", handleTextEl);

    return () => {
      document.removeEventListener("selectionchange", handleSelect);
      document.removeEventListener("mouseup", handleTextEl);
    };
  }, []);

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
    <div className="relative ml-[100px]">
      <img src="/information_1/Group_7.png" alt="" />
      <div className="p-4 text-gray-800 text-[15px] absolute top-3 w-full">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: direction * 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <h3 className=" mt-[20px] mb-[20px] font-bold text-lg">
            {text[currentIndex].heading}
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            {text[currentIndex].content.map((item, i) => (
              <li key={item.id}>{getToolTiptext(item.paragraph)}</li>
            ))}
          </ul>
        </motion.div>

        {/* Navigation buttons */}
        <div className="flex justify-center gap-4 mt-4">
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
      </div>
    </div>
  );
};

export default VanMieuInfo;
