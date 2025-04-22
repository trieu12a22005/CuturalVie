import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function StartCardGame() {
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 2000);
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
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
        src="/game3/group.png"
        alt=""
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      />

      <motion.img
        className="absolute left-[20%] bottom-10"
        src="/game3/character.png"
        alt=""
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      />

      <motion.img
        className="absolute right-[20%] bottom-10"
        src="/game3/sen.png"
        alt=""
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      />

      <motion.img
        className="absolute left-[10%] top-4"
        src="/game3/bird.png"
        alt=""
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {showButton && (
        <motion.button
          className="absolute bottom-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-green-400 text-white rounded-full hover:bg-green-500 shadow-md transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/game3/rule')}
        >
          Tiếp tục
        </motion.button>
      )}
    </motion.section>
  );
}

export default StartCardGame;
