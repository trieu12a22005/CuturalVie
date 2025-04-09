import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
let winText="Giỏi quá! Bạn đã trả lời đúng rồi"
let loseText="Tiếc quá! Hết thời gian mất rồi"
function Congra({type}) {
  let isWin=type=="win"
  return (
  
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut",delay: isWin ? 0.5 : 0}}
      className="bg-green-100 z-10 min-w-[300px] px-10 py-6 rounded-2xl shadow-md text-center w-64 absolute right-[0] bottom-0 mr-10"
    > 
      <p className="font-semibold text-2xl">{isWin ? winText : loseText}</p>
      <img
        src={isWin ? "/star/correct.png" : "/star/wrong.png"}
        alt="Happy Star"
        className="mx-auto mt-3"
      />
    </motion.div>
    
  );
}

export default Congra;
