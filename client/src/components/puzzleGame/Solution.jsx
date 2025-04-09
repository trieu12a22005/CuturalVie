import React from "react";
import Congra from "../Game/Congra";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
function Solution() {
  let {modal}=useSelector(state=>state.puzzle)
  return (
    <section className="w-full relative">
    <div className="w-fit mx-auto mt-10">
      <motion.img
        className="fixed left-1/2 -translate-x-1/2 bottom-[10%]"
        src={modal=="win" ? "/template/group1.png" : "/template/group4.png"}
        alt=""
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      <div className="w-[400px]">
        <motion.div
          className="bg-green-100 text-black p-4 rounded-2xl shadow-md text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-green-300 text-green-900 font-semibold px-3 py-1 rounded-full">
            Đáp án
          </span>
          <p className="mt-2 font-medium">Trống Đồng Đông Sơn</p>
        </motion.div>

        <div className="relative">
          <motion.img
            className="mt-8"
            src="/drum/result.png"
            alt=""
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </div>
      </div>
    </div>
  
      <Congra type={modal} />
  </section>
   
  );
}

export default Solution;
