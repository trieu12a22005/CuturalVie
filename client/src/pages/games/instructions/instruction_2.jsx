import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import { useAudio } from "../../../context/AudioContext";
import InteractUser from "../../../components/InteractUser";
import Layout from "./Layout";


const text =
  "Ở Việt Nam được chia thành 6 vùng miền văn hóa khác nhau với những nét đặc trưng khác nhau, từ đó làm đa dạng văn hóa Việt. Miu giới thiệu cho bạn 6 vùng đó nhé:";

const listItems = [
  "(1) Đồng bằng Bắc Bộ",
  "(2) Việt Bắc",
  "(3) Tây Bắc",
  "(4) Bắc Trung Bộ và duyên hải Trung Bộ",
  "(5) Trường Sơn – Tây Nguyên",
  "(6) Nam Bộ",
];

const textVariants = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: { delay: i * 0.1 },
  }),
};

// List animation (Slower fade-in)
const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i *0.7, duration: 0.8 },
  }),
};

function Instruction_2() {
  const textDuration = text.split(" ").length * 0.1 + 2.5; // Calculate total duration of paragraph
  const { setIsPlaying } = useAudio();
  return (
    <div>
    <InteractUser setIsPlaying={setIsPlaying} />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-lg shadow-lg w-[90vw] h-[90vh] relative"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 10 }}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 bg-[#14AE5C] px-3 py-2 rounded-md"
        >
          <AiOutlineClose size={21} className="text-white" />
        </motion.button>

        <motion.img
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 -translate-y-1/2 right-5"
          src="map.png"
          alt="Vietnam Map"
        />

        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-20 w-fit"
        >
          <div className="relative w-fit">
            <img src="group.png" alt="Hanging Board" />
            <div className="absolute left-1/2 -translate-x-1/2 top-[230px] w-[80%] font-bold">
              <p className="mb-3">
                {text.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </p>

              <motion.ul className="list-disc pl-6">
                {listItems.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index + textDuration}
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </motion.div>

        <motion.img
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-[-35px] left-[-60px]"
          src="/character/character1.png"
          alt="Character"
        />

        <motion.img
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-[-20px] left-50"
          src="bird.png"
          alt="Bird"
        />
    
     </motion.div>
  </div>
  );
}

export default Instruction_2;
