import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
let congra = "Giỏi quá! Bạn đã trả lời đúng rồi";
let encourage = "Tiếc quá! Câu trả lời này chưa phù hợp";
function Modal() {
  let { modal } = useSelector((state) => state.quizz);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-green-100 p-10 rounded-3xl shadow-md w-full max-w-[552px] min-h-[290px] mx-auto mt-10"
    >
      <h2 className="text-black font-bold text-center">
        {modal == "correct" ? congra : encourage}
      </h2>

      <img className="mx-auto" src={`/star/${modal}.png`} alt="" />
    </motion.div>
  );
}

export default Modal;
