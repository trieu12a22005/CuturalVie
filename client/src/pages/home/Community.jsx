import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Link } from "react-router-dom";

const communityData = [
  {
    name: "Lê Minh Trung",
    role: "Giáo viên, Hà Nội",
    message:
      "Tôi sử dụng các trò chơi VietCutural trong lớp học của mình để khiến giáo dục văn hóa trở nên hấp dẫn hơn đối với học sinh...",
    avatar: "/home/users/user1.png",
  },
  {
    name: "Nguyễn Tiên",
    role: "Du học sinh, Hà Lan",
    message:
      "Trò chơi lật tranh đã giúp tôi học được rất nhiều điều về trang phục truyền thống Việt Nam mà trước đây tôi chưa từng biết! Nhờ nó, tôi đã giới thiệu cho...",
    avatar: "/home/users/user2.png",
  },
  {
    name: "Đinh Cường",
    role: "Sinh viên, HCM",
    message:
      "Tôi muốn đọc thông tin nhiều hơn về trang phục dân tộc để viết luận văn, tôi có thể tìm nó ở đâu...",
    avatar: "/home/users/user3.png",
  },
  {
    name: "Lê Bích Ngọc",
    role: "Bác sĩ, Cần Thơ",
    message:
      "Tôi có rất ít thời gian để kể cho con của mình về lịch sử dân tộc và tôi đã chỉ con tôi lên VietCutural...",
    avatar: "/home/users/user4.png",
  },
  {
    name: "Bùi Công Sinh",
    role: "Học sinh, Gia Lai",
    message:
      "Mọi người có ai là dân tộc Chăm ở đây không ạ, em muốn được phỏng vấn mọi người để có thông tin cho bài khảo sát...",
    avatar: "/home/users/user5.png",
  },
  {
    name: "Hoàng Dũng",
    role: "Nghỉ hưu, Đà Nẵng",
    message:
      "Web này đã giúp ông giết thời gian rảnh rất nhiều, ông không bao giờ chơi kịp vòng lật ảnh haha!",
    avatar: "/home/users/user6.png",
  },
];

export default function VietcuturalCommunity() {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut", delay: 0.3 },
        },
      }}
      className="p-4 max-w-5xl mx-auto font-[lora]"
    >
      <h1 className="text-3xl text-white font-bold text-center mb-8">
        CỘNG ĐỒNG ĐANG LÀM GÌ TẠI VIETCUTURAL
      </h1>
      <div className="grid grid-cols-3 gap-6">
        {communityData.map((user, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-4 space-y-2 flex flex-col"
          >
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold text-lg">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.role}</p>
              </div>
            </div>
            <p className="text-base">“{user.message}”</p>
            <div className="flex items-center gap-4 text-sm text-gray-500 mt-auto">
              <div className="flex items-center gap-1">
                <img src="/home/icons/heart.png" alt="" /> 27 yêu thích
              </div>
              <div className="flex items-center gap-1">
                <img src="/home/icons/chat.png" alt="" /> 3 bình luận
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button className="bg-[#7CC68D] text-white py-2.5 px-10 rounded-full text-lg font-semibold hover:bg-[#68b07c] transition">
        <Link to={"/instructions_1"}>Chơi game</Link>
        </button>
      </div>
    </motion.div>
  );
}
