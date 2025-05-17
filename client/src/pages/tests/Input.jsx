import React, { useState } from "react";
import Level from "../../components/tests/input/Level";
import Experience from "../../components/tests/input/Experience";
const options1 = [
  "Lễ hội/ phong tục",
  "Ẩm thực vùng miền",
  "Trang phục truyền thống",
  "Âm nhạc/ nhạc cụ",
  "Di tích lịch sử",
  "Tôi chưa từng tiếp xúc",
];
const options2 = [
  "Xem tranh ảnh, nghe kể chuyện",
  "Làm câu đố",
  "Video hoạt hình / phim tài liệu",
  "Chơi game nhẹ nhàng",
  "Đọc và ghi chép lại",
  "Tôi chưa biết – muốn trải nghiệm thử",
];

export default function CultureLevelModal() {
  const [index, setIndex] = useState(0);
  let [ans, setAns] = useState({
    1: null,
    2: null,
    3: null,
  });
  let lists = [
    <Level setAns={setAns} />,
    <Experience ans={ans} setAns={setAns} options={options1} index={2} />,
    <Experience ans={ans} setAns={setAns} index={3} options={options2} />,
  ];
  let handleNext = () => {
    if (index < 2) {
      setIndex(index + 1);
    } else {
      console.log(ans);
    }
  };
  return (
    <>
      <div className="bg-white p-6 rounded-xl max-w-xl w-full shadow-md mt-7">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-4">
          Bạn là ai trên hành trình khám phá văn hóa Việt?
        </h2>

        {lists[index]}
        <div className="flex justify-between">
          <button
            onClick={() => setIndex(index - 1)}
            disabled={index === 0}
            className={`px-4 py-2 rounded-md font-semibold ${
              index === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            Câu trước
          </button>
          <button
            onClick={handleNext}
            className={`px-4 py-2 rounded-md font-semibold bg-green-500 text-white hover:bg-green-600`}
          >
            {index < 2 ? " Câu tiếp" : "Hoàn thành"}
          </button>
        </div>
      </div>
    </>
  );
}
