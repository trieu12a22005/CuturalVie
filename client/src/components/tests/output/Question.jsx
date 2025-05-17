import React, { useState } from 'react';

function QuestionOutput() {
  const [selected, setSelected] = useState(null);

  const options = [
    { label: 'A', text: 'Quảng Nam' },
    { label: 'B', text: 'Quảng Ngãi' },
    { label: 'C', text: 'Đà Nẵng' },
    { label: 'D', text: 'Hội An' },
  ];

  return (
    <div className="mb-5">
      <h2 className="text-xl font-semibold text-green-700 mb-6">
        Câu 2: Địa danh “Tourane” trong các tài liệu Pháp thời kỳ thuộc địa là để chỉ khu vực nào ngày nay?
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {options.map((opt) => (
          <div
            key={opt.label}
            onClick={() => setSelected(opt.label)}
            className={`flex items-center gap-3 cursor-pointer p-2 rounded-md transition ${
              selected === opt.label ? 'bg-green-100 border border-green-500' : ''
            }`}
          >
            <div
              className={`${
                selected === opt.label ? 'bg-green-500 text-white' : 'bg-green-200 text-black'
              } font-bold w-8 h-8 flex items-center justify-center rounded-full`}
            >
              {opt.label}
            </div>
            <span>{opt.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionOutput;
