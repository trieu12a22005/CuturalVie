import React from "react";
import { motion } from "framer-motion";

const regions = [
  { name: "Tây Bắc", image: "/home/regions/tay-bac.png" },
  { name: "Việt Bắc", image: "/home/regions/viet-bac.png" },
  { name: "Đồng bằng Bắc Bộ", image: "/home/regions/bac-bo.png" },
  { name: "Duyên hải Nam Trung Bộ", image: "/home/regions/duyen-hai-nam-trung-bo.png" },
  { name: "Tây Nguyên", image: "/home/regions/tay-nguyen.png" },
  { name: "Nam Bộ", image: "/home/regions/nam-bo.png" },
];

function VietnamRegions() {
  return (
    <section className="w-[90%] mx-auto font-[Lora] text-white py-16">
      <h2 className="text-center text-3xl font-bold mb-12">ĐI DỌC VIỆT NAM</h2>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid grid-cols-6 gap-6"
      >
        {regions.map((region, index) => (
          <div
            key={region.name}
            className={`relative h-[500px] overflow-hidden rounded-[36px] shadow-lg transition-transform duration-300 group ${
              index % 2 === 1 ? "translate-y-10" : ""
            }`}
          >
            <img
              src={region.image}
              alt={region.name}
              className="w-full h-full object-cover rounded-[36px]"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-center p-4 rounded-[36px] transition duration-300">
              <span className="text-lg font-semibold">{region.name}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

export default VietnamRegions;
