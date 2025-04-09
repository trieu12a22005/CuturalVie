import React from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import { motion } from "framer-motion";
function Question() {
  let { current, questions, modal } = useSelector((state) => state.quizz);
  let currentQues = questions[current];
  if (modal) return <Modal />;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-green-100 p-10 rounded-3xl shadow-md w-full max-w-[552px] min-h-[290px] mx-auto mt-10"
    >
      {/* Title */}
      <div className=" bg-green-300 px-4 py-1 rounded-full w-fit mx-auto">
        <h2 className="text-black font-bold ">Câu hỏi {current + 1}</h2>
      </div>

      {/* Question Text */}
      <p className="text-center text-lg font-semibold text-black mt-6">
        {currentQues.question}
      </p>
    </motion.div>
  );
}

export default Question;
