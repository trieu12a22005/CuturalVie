import React from "react";
import Layout from "./Layout";
import { getClassname, images, text } from "../../../utils/select";
import {  motion } from "framer-motion";
const textVariants = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: { delay: 0.5+i*0.1 },
  }),
};
function Select() {
  return (
    <Layout>
      {images.map((src, index) => (
        <img
          className={
            getClassname(src) +
            " absolute transition-transform duration-300 hover:scale-110"
          }
          key={index}
          src={src}
         
        />
      ))}

      <div className="relative w-fit top-[90px] left-7">
        <img src="/items/chat.png" alt="Hanging Board" />

        <p className=" absolute top-12 left-10 font-semibold text-lg w-[75%]">
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
      <motion.img
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-[-35px] left-[-60px]"
        src="/character/character2.png"
        alt="Character"
      />

      <motion.img
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute left-[300px] top-[320px]"
        src="/items/hat.png"
        alt="Bird"
      />
    </Layout>
  );
}

export default Select;
