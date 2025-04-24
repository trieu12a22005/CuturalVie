import React, { useState } from "react";
import QuizHeader from "../headerGame";
import Slider from "./Slider";
import VanMieuInfo from "./Info";
import { motion } from "framer-motion";
import AIAssistantModal from "../../AI/Assistance";
import { MessageSquare } from "lucide-react";

function Learning() {
  const [open, setOpen] = useState(null);
  let [chatData, setChatdata] = useState(null);
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
          <VanMieuInfo setChatdata={setChatdata} />
        </div>
      </motion.div>

      {/* Chat button with animation */}
      <button
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition duration-300 flex items-center space-x-2"
        onClick={() =>setOpen(!open)}
      >
        <MessageSquare className="w-6 h-6" />
        <span className="text-sm">Chat cùng AI</span>
      </button>

      <AIAssistantModal
        open={open}
        setOpen={setOpen}
        chatData={chatData}
      />
    </>
  );
}

export default Learning;
