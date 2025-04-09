import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAudio } from "../../../context/AudioContext";
import InteractUser from "../../../components/InteractUser";

const text =
  "Chào cậu! Mình là Miu, hướng dẫn viên của VietCultural. Mình sẽ là người bạn đồng hành cùng cậu trong hành trình khám phá di sản văn hóa ở Việt Nam.";

const textVariants = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: { delay: i * 0.1 },
  }),
};

function Instruction_1() {
  const { setIsPlaying } = useAudio();
  const navigate = useNavigate();

  return (
    <div>
      <InteractUser setIsPlaying={setIsPlaying} />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-lg shadow-lg w-[664px] h-[640px] relative"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 10 }}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 bg-[#14AE5C] px-3 py-2 rounded-md"
        >
          <AiOutlineClose size={21} className="text-white" />
        </motion.button>
        <h2 className="pt-4 font-bold text-3xl text-center">
          Chào mừng bạn đến với VietCultural
        </h2>

        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-20 w-fit"
        >
          <div className="relative w-[1000px]">
            <img
              src="instruction1.1.png"
              alt="Hanging Board"
              className="mt-20 w-[100%] h-150 flex-1"
            />
            <div className="absolute left-[250px] -translate-x-1/2 top-[80px] w-[35%] font-bold">
              <p>
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
            </div>
          </div>
        </motion.div>

        <motion.img
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-[-35px] left-[-200px]"
          src="/character/character2.png"
          alt="Character"
        />
        <motion.img
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute top-[120px] left-[600px] w-[348px] h-[252px]"
          src="bird_2.png"
          alt="Bird"
        />

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 3.5 }}
          className="absolute bottom-[190px] right-[60px] w-[330px] h-[50px] bg-green-300 rounded-[20px]"
          onClick={() => navigate("/instructions_2")}
        >
          <span className="font-semibold text-1xl cursor-pointer ">
            Được rồi đi thôi
          </span>
        </motion.button>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 3.5 }}
          className="absolute bottom-[120px] right-[60px] w-[330px] h-[50px] bg-green-300 rounded-[20px]"
          onClick={() => navigate("/instructions_2")}
        >
          <span className="font-semibold text-1xl cursor-pointer ">
            Ok đi thôi
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Instruction_1;
