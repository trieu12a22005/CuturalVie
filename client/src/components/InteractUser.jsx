import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function InteractUser({ setIsPlaying }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("isReloaded")) {
      setIsVisible(true);
      sessionStorage.removeItem("isReloaded");
    }
  }, []);

  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white w-[300px] h-[200px] flex flex-col justify-center items-center rounded-lg shadow-lg"
      >
        <p className="text-lg font-semibold mb-4">Ấn để tiếp tục</p>
        <button
          onClick={() => {
            setIsVisible(false);
            setIsPlaying(true);
          }}
          className="w-[100px] h-[50px] bg-green-500 text-white rounded-[20px] hover:bg-green-600 transition duration-200"
        >
          OK
        </button>
      </motion.div>
    </div>
  );
}

export default InteractUser;
