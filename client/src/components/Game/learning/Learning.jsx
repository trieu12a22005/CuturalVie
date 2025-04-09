import React from "react";
import QuizHeader from "../headerGame";
import Slider from "./Slider";
import VanMieuInfo from "./Info";
import { motion } from "framer-motion";
function Learning() {
  return (
    <>
      <QuizHeader />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-[90%] left-1/2 p-6 -translate-x-1/2 bg-[#EBFFEB] rounded-2xl fixed top-26 h-[80%]"
      >
        <h2 className="text-xl font-semibold bg-purple-200 px-4 py-2 rounded-2xl w-fit mx-auto">
          Khơi nguồn tri thức
        </h2>

        <img
          className="absolute -bottom-3 -left-3"
          src="/character/dragon.png"
        />

        <div className="flex mt-3 items-center">
          <Slider />
          <VanMieuInfo />
        </div>
      </motion.div>
    </>
  );
}

export default Learning;
