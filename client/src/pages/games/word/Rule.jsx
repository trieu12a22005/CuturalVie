import { motion } from "framer-motion";
import InteractUser from "../../../components/InteractUser";
import { useAudio } from "../../../context/AudioContext";

function RuleWord() {
  const { setIsPlaying } = useAudio();
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
      className="relative w-[95%] h-[95%] mx-auto"
    >
      <InteractUser setIsPlaying={setIsPlaying} />
      <img
        src="/rule/rule4.png"
        className="absolute w-full h-full object-contain z-0"
        alt="Rule Background"
      />

      {/* Nội dung text overlay */}
      <div className="absolute top-[38%] left-[52%] translate-x-[-50%] text-[18px] font-semibold w-[650px]">
        <p className="">
          Chào mừng bạn đến với “Khám Phá Mã Lệnh”! <br />
          Đây là hành trình tìm kiếm và hoàn thành những từ có nghĩa! Bạn sẽ
          trải qua 10 câu hỏi, mỗi câu hỏi cung cấp một từ với những chữ cái bị
          thiếu. Nhiệm vụ của bạn là điền vào các chữ cái còn thiếu để tạo thành
          từ đúng nghĩa. Sau mỗi câu hỏi, bạn sẽ được cung cấp thêm thông tin bổ
          ích để mở rộng vốn từ của mình.
          <br />
          Cách chơi: <br />
          Mỗi câu hỏi có 30 giây để trả lời. Hãy nhanh chóng và chính xác!
          <br />
          Để giành được 1 sao trong hành trình, bạn cần trả lời đúng ít nhất
          7/10 câu.
          <br />
          Chúc bạn may mắn và thành công trong hành trình khám phá mã lệnh này!
        </p>
        <button className="mt-[20px] flex ml-[250px] bg-[#009951] p-[10px] pl-[20px] pr-[20px] rounded-2xl text-white font-bold">Chơi ngay</button>
      </div>
    </motion.div>
  );
}

export default RuleWord;
