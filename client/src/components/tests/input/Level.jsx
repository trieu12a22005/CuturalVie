import React, { useEffect, useState } from 'react'

const levels = [
  { id: 1, label: "Tôi chưa biết gì cả", percent: 0 },
  { id: 2, label: "Tôi biết sơ sơ vài điều (Tết, áo dài,...)", percent: 25 },
  { id: 3, label: "Tôi từng học ở trường", percent: 50 },
  { id: 4, label: "Tôi biết nhiều qua đọc sách, xem phim tài liệu", percent: 75 },
  { id: 5, label: "Tôi là người nghiên cứu / yêu thích chủ đề này", percent: 100 },
];

function Level({setAns}) {
    const [selectedLevel, setSelectedLevel] = useState(levels[0]);
    useEffect(()=>{
        setAns(prev=>({...prev,1: selectedLevel.label}));
    },[selectedLevel])
  return (
    <>
       <p className="text-lg font-semibold text-green-700 mb-6">
          Câu 1: Bạn đánh giá về mức độ hiểu của bản thân lịch sử – văn hóa Việt Nam như thế nào?
        </p>
        <div className="flex justify-between gap-2 mb-6">
          {levels.map((level) => (
            <button
              key={level.id}
              className={`flex-1 py-2 rounded-md text-white font-semibold transition-all
                ${selectedLevel.id === level.id ? 'bg-green-600' : 'bg-gray-400 hover:bg-gray-500'}`}
              onClick={() => setSelectedLevel(level)}
            >
              {level.percent}%
            </button>
          ))}
        </div>

        {/* Selected output */}
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">{selectedLevel.percent}%</p>
          <p className="text-base mt-2">{selectedLevel.label}</p>
        </div>
    </>
  )
}

export default Level