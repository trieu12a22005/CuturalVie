import React, { useEffect, useRef } from 'react'

function AIProvider({children}) {
    const selected = useRef();
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
  
          }
        } else {
          selected.current = null;
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
  return children
}

export default AIProvider