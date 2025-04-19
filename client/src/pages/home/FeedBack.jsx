import React from "react";

function FeedBack() {
  return (
    <div className="bg-[#f0fbea] py-12 px-4 font-[lora]">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-green-600 mb-6">
        Đánh giá và đóng góp
      </h2>
      <div className="bg-[#1a1411] text-white rounded-2xl p-8 flex flex-col lg:flex-row items-start justify-between gap-6">
        <div className="lg:max-w-[60%]">
          <h3 className="text-2xl font-bold mb-2">VietCultural xin chân thành cảm ơn!</h3>
          <p className="text-lg">
            Hãy gửi ý kiến đóng góp để VietCultural có thể ngày càng hoàn thiện hơn bạn nhé.
          </p>
        </div>
        <div className="flex w-full lg:w-1/2">
          <input
            type="text"
            placeholder="Give comments"
            className="flex-grow px-4 py-3 rounded-l-lg bg-white text-black focus:outline-none"
          />
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-r-lg transition duration-300">
            Enter
          </button>
        </div>
      </div>
    </div>
  </div>)
}

export default FeedBack;
