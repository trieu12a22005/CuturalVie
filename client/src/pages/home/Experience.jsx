import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Quiz",
    description: (
      <>
        Thử thách bản thân với những <strong>câu hỏi</strong> về lịch sử và
        truyền thống phong phú của Việt Nam.
      </>
    ),
    image: "/home/feature/chat.png",
  },
  {
    title: "Ghép tranh",
    description: (
      <>
        Ghép các cảnh truyền thống Việt Nam và các yếu tố văn hóa trở thành{" "}
        <strong>bức tranh có nghĩa</strong>
      </>
    ),
    image: "/home/feature/puzzle.png",
  },
  {
    title: "Trí nhớ",
    description: (
      <>
        Lật các hiện vật văn hóa, địa danh và vật phẩm truyền thống trong{" "}
        <strong>thử thách trí nhớ</strong> này.
      </>
    ),
    image: "/home/feature/photo.png",
  },
  {
    title: "Thuật ngữ",
    description: (
      <>
        Kiểm tra kiến thức của bạn về các <strong>thuật ngữ</strong> văn hóa và
        nhân vật lịch sử Việt Nam.
      </>
    ),
    image: "/home/feature/speech.png",
  },
];

export default function Experience() {
  return (
    <div className="pt-20 max-w-3xl mx-auto font-[lora]">
      <h2 className="text-3xl text-white font-bold text-center mb-8">
        TRẢI NGHIỆM VUI NHỘN
      </h2>
      <div className="grid grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
            className="bg-white rounded-2xl text-center p-6 shadow-md"
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-20 h-20 mx-auto mb-4"
            />
            <p className="text-base text-gray-800">{feature.description}</p>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
          className="bg-[#98D99A] hover:bg-[#87c489] text-white text-lg px-6 py-2 rounded-full transition font-bold"
        >
          Chơi game
        </motion.button>
      </div>
    </div>
  );
}
