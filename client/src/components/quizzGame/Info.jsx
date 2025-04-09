import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const content = [
  {
    title: "Lịch sử hình thành",
    items: [
      "Bia tiến sĩ ở Văn Miếu Quốc Tử Giám bắt đầu được khởi công ngày 15/8 năm Giáp Thìn, niên hiệu Hồng Đức thứ 15 Triều Lê Thánh Tông (1482), và kết thúc vào năm Canh Tý niên hiệu Cảnh Hưng thứ 41 Triều Lê Hiển Tông (1780).",
      "Các bia khắc danh sách các tiến sĩ Nho học Việt Nam của các khoa thi Đình từ năm Nhâm Tuất niên hiệu Đại Bảo thứ 3 Triều Lê Thái Tông (1442) đến khoa thi năm Kỷ Hợi niên hiệu Cảnh Hưng thứ 41 đời Lê Hiển Tông (1779).",
      "Như vậy, kể từ khoa thi năm 1442 đến khi lần đầu tiên triều đình bắt đầu khởi công dựng bia là 42 năm. Từ khoa Nhâm Tuất 1442 đến khoa thi năm 1884 thực tế có 12 khoa thi, nhưng chỉ có 10 bia.",
      "Đặc biệt, hai khoa không dựng bia là khoa thi năm Thái Hòa thứ 11 (1453) và khoa Diên Ninh thứ 5 (1458). Đây là một bí ẩn của lịch sử mà nhiều nhà nghiên cứu quan tâm.",
    ],
  },
  {
    title: "Đặc điểm kiến trúc",
    items: [
      "Tất cả 82 bia Tiến sĩ hiện còn ở Văn Miếu – Quốc Tử Giám đều được chế tác theo cùng một phong cách, thuộc loại bia dẹt, gồm 2 phần: Bia (trán bia và thân bia) và đế bia.",
      "Trán bia: Trán bia hình vòm, khắc các họa tiết trang trí, bố cục trán bia có tiêu đề bia, thường viết theo lối chữ triện.",
      "Thân bia: Thân bia hình chữ nhật, hai bên diềm bia và chân bia trang trí hoa văn, lòng bia khắc bài văn bia bằng chữ Hán có gồm bài ký, danh sách các vị đỗ Tiến sĩ, cùng chức vụ, tên tuổi của người soạn văn bia, người nhuận sắc, người viết, năm dựng bia.",
      "Đế bia: Đế bia được tạo dáng hình rùa với những đặc điểm nghệ thuật trang trí khác nhau. Đế bia hình rùa thể hiện sự trường tồn, bền vững của hiền tài, giáo dục và của bia Tiến sĩ.",
    ],
  },
  {
    title: "Giá trị văn hóa, lịch sử",
    items: [
      "Tháng 3 năm 2010, Ủy ban Ký ức thế giới Khu vực Châu Á - Thái Bình Dương đã công nhận bia Tiến sĩ là Di sản tư liệu - Ký ức thế giới khu vực Châu Á - Thái Bình Dương.",
      "Tháng 5 năm 2011, Tổng giám đốc UNESCO đã công nhận 82 bia Tiến sĩ là Di sản tư liệu và ghi vào danh mục Ký ức thế giới toàn cầu.",
      "Ngày 14 tháng 1 năm 2015, Thủ tướng chính phủ nước Cộng hòa xã hội chủ nghĩa Việt Nam đã công nhận 82 bia Tiến sĩ tại Văn Miếu – Quốc Tử Giám là Bảo vật quốc gia.",
      "Đây chính là sự đánh giá, công nhận giá trị đặc biệt của bia Tiến sĩ tại Văn Miếu – Quốc Tử Giám đối với nền văn hóa, giáo dục của dân tộc Việt Nam nói riêng, của toàn nhân loại nói chung.",
    ],
  },
];


const VanMieuInfo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  const nextContent = () => {
    if (currentIndex < content.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevContent = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative ml-[100px]">
      <img src="/information_1/Group_7.png" alt="" />
      <div className="p-4 text-gray-800 text-sm absolute top-3 w-full">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: direction * 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <h3 className="font-bold text-lg">
            {currentIndex + 1}. {content[currentIndex].title}:
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            {content[currentIndex].items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </motion.div>

        {/* Navigation buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={prevContent}
            disabled={currentIndex === 0}
            className={`p-2 border rounded-full ${
              currentIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextContent}
            disabled={currentIndex === content.length - 1}
            className={`p-2 border rounded-full ${
              currentIndex === content.length - 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VanMieuInfo;