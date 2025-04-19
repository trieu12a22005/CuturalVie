import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    icon: "/home/icons/game.png",
    title: "Game văn hóa",
    description:
      "Tìm hiểu văn hóa Việt Nam thông qua các minigame thú vị như lật tranh, đoán từ và đố vui về văn hóa và nhận về những phần thưởng hấp dẫn!",
  },
  {
    icon: "/home/icons/forum.png",
    title: "Cộng đồng chia sẻ",
    description:
      "Kết nối và lan tỏa niềm đam mê văn hóa, chia sẻ kiến thức và thảo luận về truyền thống Việt Nam trong cộng đồng sôi động của chúng tôi!",
  },
  {
    icon: "/home/icons/idea.png",
    title: "Khơi nguồn tri thức",
    description:
      "Khám phá kho tư liệu về lễ hội, di sản, ẩm thực, phong tục... và sự khác biệt giữa từ khắp 6 miền văn hoá Việt!",
  },
];

function Feature() {
  return (
    <section className="w-[80%] h-[80vh] mx-auto text-white font-[Lora]">
      <h2 className="text-center text-3xl font-bold mb-10">
        KHÁM PHÁ VIETCUTURAL
      </h2>
      <div className="flex justify-between gap-20">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-gradient-to-b from-[#4DBA7A] to-[#DFF1E3] rounded-[36px] w-1/3 p-6 text-center shadow-lg h-[480px]"
          >
            <img
              src={item.icon}
              alt={item.title}
              className="mx-auto w-[64px] mb-4"
            />
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-base text-white">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Feature;
