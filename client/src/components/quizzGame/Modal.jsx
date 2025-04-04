import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
let congra = "Giỏi quá! Bạn đã trả lời đúng rồi";
let encourage = "Tiếc quá! Câu trả lời này chưa phù hợp";
function Modal(props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-green-100 p-10 rounded-3xl shadow-md w-full max-w-[552px] min-h-[290px] mx-auto mt-10 mb-10"
    >
      <h2 className="text-black font-bold text-center">
        {props.modal == "correct" ? congra : encourage}
      </h2>

      {props.modal && <img src={`/star/${props.modal}.png`} alt="" className="mx-auto" />}

    </motion.div>
  );
}

export default Modal;
