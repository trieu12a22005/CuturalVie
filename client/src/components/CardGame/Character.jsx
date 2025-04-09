import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
function Character() {
  let { modal } = useSelector((state) => state.card);
  let images = {
    character: "",
    chat: "",
  };
  if (modal == "win") {
    images = {
      character: "/character/character8.png",
      chat: "/game2/chat1.png",
    };
  } else if (modal == "lose") {
    images = {
      character: "/character/character7.png",
      chat: "/game2/chat2.png",
    };
  } else {
    images = {
      character: "/character/character9.png",
      chat: "/game2/chat3.png",
    };
  }
  return (
    <div className="fixed bottom-0">
      <motion.img
        key={modal} 
        src={images.character}
        alt=""
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      />

      <motion.img
        key={modal + "-chat"}
        src={images.chat}
        alt=""
        className="absolute bottom-[95%] left-[70%]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
    </div>
  );
}

export default Character;
