import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../../components/BackButton';

function PuzzleRule() {
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 2000); // Show button after 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
        <motion.section
      className="relative w-[95%] h-[95%]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.img
        className="absolute left-[53%] -translate-x-1/2 w-full h-auto -top-8"
        src="/game2/group.png"
        alt="Group Image"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      />

      <motion.img
        className="absolute left-[6%] bottom-10"
        src="/game2/character.png"
        alt="Character Image"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      />

      {/* Button appears after 2 seconds */}
      {showButton && (
        <motion.button
          className="absolute bottom-2 left-[55%] -translate-x-1/2 px-6 py-2 bg-green-400 text-white font-bold rounded-full hover:bg-green-500 shadow-md transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/game2/play')}
        >
          Sẵn Sàng
        </motion.button>
      )}
    </motion.section>
    <BackButton/>
    </>
   
  );
}

export default PuzzleRule;
