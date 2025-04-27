import React from "react";
import { motion } from "framer-motion";
import {
  calculateTextDuration,
  firstParaDuration,
  firstParagraphText,
  lastParagraphText,
  listItems,
  secondParaDuration,
  secondParagraphText,
} from "../../../utils/quizz";
import InteractUser from "../../../components/InteractUser";
import { useAudio } from "../../../context/AudioContext";
import { useLocation, useNavigate } from "react-router-dom";
import Backbutton from '../../../components/BackButton'
// ✨ Hiệu ứng chữ từng ký tự
const letterVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.2 },
  }),
};

const AnimatedText = ({ text, delay = 0 }) => {
  return (
    <motion.p
      className="mt-2"
      initial="hidden"
      animate="visible"
      custom={delay}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          custom={i + delay / 0.03}
        >
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
};

const Rule = () => {
  const { setIsPlaying } = useAudio();
  const location = useLocation();
  const navigate = useNavigate();

  const { region } = location.state || {};
  const handleClick = () => {
    navigate("/game_1", {
      state: {
        region: region,
      },
    });
  };

  const totalDuration =
    firstParaDuration +
    secondParaDuration +
    0.5 +
    listItems.length * 0.5 +
    calculateTextDuration(lastParagraphText) +
    0.3;
  
  return (
    <>
       <main
        className="flex-1 flex items-center justify-center bg-cover bg-center"
      
      >
        <InteractUser setIsPlaying={setIsPlaying} />
      <div className="relative w-fit">
        <img
          className="min-h-[100%]"
          src="/rule/rule1.png"
          alt="Rule Background"
        />

        <div className="absolute font-bold text-[17px] w-[65%] h-full left-42 top-55 font-[Lora]">
          <AnimatedText text={firstParagraphText} />
          <AnimatedText
            text={secondParagraphText}
            delay={firstParaDuration + 0.3}
          />

          <motion.ul className="ml-6 list-disc">
            {listItems.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay:
                    firstParaDuration + secondParaDuration + 0.5 + index * 0.7,
                  duration: 1.5,
                  ease: "easeOut",
                }}
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>

          <AnimatedText
            text={lastParagraphText}
            delay={
              firstParaDuration +
              secondParaDuration +
              0.5 +
              listItems.length * 0.5 +
              0.3
            }
          />
        </div>

        {/* Start Button  */}
        <motion.button
          onClick={handleClick}
          className="absolute bottom-12 left-70 z-30 bg-green-200 text-gray-700 font-bold px-4 py-2 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: totalDuration + 0.5 }}
        >
          Bắt đầu
        </motion.button>
      </div>

      <motion.img
        className="absolute right-[12%]"
        src="/2bird.png"
        alt="Birds"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1,
          delay: 0,
        }}
      />
      </main>
      <Backbutton/>
    </>
  );
};

export default Rule;
