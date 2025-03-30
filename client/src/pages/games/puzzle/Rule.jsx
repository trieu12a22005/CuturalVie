import React from "react";

function PuzzleRule() {
  return (
    <div
      className="relative h-[600px] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/rule/rule2.png')" }}
    >
      {/* Instructions Overlay (without repeating title) */}
      <div className="absolute bottom-10 px-8 text-center max-w-2xl">
        <p className="text-gray-700 text-lg">
          Chào mừng bạn đến với "Mảnh ghép vạn năng"! Trong trò chơi này, bạn sẽ
          phải ghép các mảnh hình ảnh đã bị xáo trộn...
        </p>

        <h3 className="mt-4 text-lg font-semibold">Cách chơi:</h3>
        <ul className="list-disc pl-6 text-gray-700 text-left">
          <li>Mỗi hình ảnh có 1 phút để ghép...</li>
          <li>Bạn có thể hỏi AI về nội dung...</li>
          <li>Nếu bạn ghép đúng 3/6 bức ảnh...</li>
        </ul>

        <p className="text-center mt-6 font-semibold">
          Bạn đã sẵn sàng để bắt đầu chưa?
        </p>
      </div>
    </div>
  );
}

export default PuzzleRule;
