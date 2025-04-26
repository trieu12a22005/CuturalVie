import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Link } from "react-router-dom";

const stats = [
  { value: "6", label: "Vùng văn hóa", color: "text-red-500" },
  { value: "3", label: "Hành trình", color: "text-green-600" },
  { value: "100+", label: "Bài viết văn hóa", color: "text-indigo-600" },
  { value: "24/7", label: "Hỗ trợ và liên hệ", color: "text-orange-500" },
];

const About = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const leftControls = useAnimation();
  const rightControls = useAnimation();

  const leftInView = useInView(leftRef, { once: true, amount: 0.3 });
  const rightInView = useInView(rightRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (leftInView) leftControls.start("visible");
  }, [leftInView, leftControls]);

  useEffect(() => {
    if (rightInView) rightControls.start("visible");
  }, [rightInView, rightControls]);

  return (
    <div className="max-w-6xl py-20 mx-auto flex items-center gap-10 font-[lora] text-white">
      <motion.div
        ref={leftRef}
        initial="hidden"
        animate={leftControls}
        variants={{
          hidden: { opacity: 0, x: -40 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut", delay: 0.3 },
          },
        }}
        className="max-w-[60%]"
      >
        <h1 className="text-4xl font-bold mb-6">
          About <span className="text-green-400">VietCultural</span>
        </h1>
        <p className="text-lg mb-4">
          VietCultural là một dự án tâm huyết dành riêng cho việc bảo tồn và
          phát huy di sản văn hóa phong phú của Việt Nam thông qua các trải
          nghiệm kỹ thuật số tương tác.
        </p>
        <p className="text-lg mb-4">
          Sứ mệnh của chúng tôi là làm cho văn hóa Việt Nam trở nên dễ tiếp cận,
          hấp dẫn và mang tính giáo dục đối với mọi người ở mọi lứa tuổi và xuất
          thân, cho dù họ là người Việt Nam di cư, những người đam mê văn hóa
          hay những người học tò mò.
        </p>
        <p className="text-lg mb-8">
          Thông qua các trò chơi và nền tảng cộng đồng được thiết kế cẩn thận
          của mình, chúng tôi hướng đến mục tiêu kết nối các thế hệ và kết nối
          mọi người với truyền thống, lịch sử và sự đa dạng của khu vực Việt
          Nam.
        </p>
        <p className="text-xl font-semibold mb-10">
          Chúc bạn có một trải nghiệm tuyệt vời tại VietCultural!
        </p>
      </motion.div>

      <motion.div
        ref={rightRef}
        initial="hidden"
        animate={rightControls}
        variants={{
          hidden: { opacity: 0, x: 40 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut", delay: 0.5 },
          },
        }}
        className="lg:w-1/3 flex flex-col items-center gap-6"
      >
        <div className="grid grid-cols-2 gap-3 bg-opacity-10 p-4 rounded-xl text-center text-black font-semibold w-full">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 min-h-[120px] flex flex-col justify-center"
            >
              <p className={`${stat.color} text-4xl font-bold`}>{stat.value}</p>
              <p className="text-lg font-bold">{stat.label}</p>
            </div>
          ))}
        </div>

        <button className="bg-[#98D99A] hover:bg-[#87c489] text-white text-lg px-6 py-2 rounded-full transition font-bold">
        <Link to={"/instructions_1"}>Chơi game</Link>
        </button>
      </motion.div>
    </div>
  );
};

export default About;