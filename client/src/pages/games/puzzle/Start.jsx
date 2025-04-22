import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function StartPuzzzle() {
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 2000); // Show button after 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section
      className="relative h-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.img
        src="/template/group5.png"
        alt=""
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />

      <motion.img
        src="/items/food/img1.png"
        alt=""
        className="absolute bottom-1 left-1"
        initial={{ x: -50, y: 50, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />

      <motion.img
        src="/items/food/img2.png"
        alt=""
        className="absolute right-1 top-1"
        initial={{ x: 50, y: -50, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />

      {/* Button appears after 2 seconds */}
      {showButton && (
        <motion.button
          className="absolute bottom-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-green-400 text-white rounded-full hover:bg-green-500 shadow-md transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/game2/rule')}
        >
          Tiếp tục
        </motion.button>
      )}
    </motion.section>
  );
}

export default StartPuzzzle;
