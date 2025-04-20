import React from "react";
import { motion } from "framer-motion";
import ImageSlider from "./Slider";

function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-[90%] mt-20 mx-auto h-[80vh] text-white font-[Lora]"
    >
      <div className="flex w-full gap-10 flex-wrap">
        {/* Left Content */}
        <div className="flex-1 max-w-[50%]">
          <img
            src="/logo/logo2.png"
            alt="Logo"
            className="mb-5"
          />
          <h2 className="text-3xl font-bold leading-snug">
            Nền tảng số cho thế hệ trẻ <br />
            Nhịp cầu nối với hồn dân tộc
          </h2>
          <p className="mt-5 text-2xl font-bold">
            Cùng chúng tôi khám phá, tìm hiểu các truyền thống, lịch sử và văn hóa
            vùng miền đa dạng của Việt Nam thông qua các trò chơi tương tác và
            giao lưu niềm đam mê văn hóa với cộng đồng yêu văn hóa Việt..
          </p>
          <p className="mt-5 text-2xl font-bold">
            Chúc bạn có trải nghiệm tuyệt vời với tại VietCultural!
          </p>
        </div>

        {/* Right Image + Buttons */}
        <div className="flex flex-col items-center gap-6">
         <ImageSlider/>
          <div className="flex gap-12 mt-4 w-full">
            <button className="bg-[#7CC68D] text-white py-2.5 rounded-full text-lg font-semibold hover:bg-[#68b07c] transition flex-1">
              Chơi game
            </button>
            <button className="border border-[#7CC68D] text-[#7CC68D] py-2.5 rounded-full text-lg font-semibold hover:bg-[#7CC68D] hover:text-white transition flex-1">
              Thông tin
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Hero;
