import React from 'react'

function QuestionOutput() {
  return (
    <div className=' mb-5'>
      <h2 className="text-xl font-semibold text-green-700 mb-6">
        Câu 2: Địa danh “Tourane” trong các tài liệu Pháp thời kỳ thuộc địa là để chỉ khu vực nào ngày nay?
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-green-200 text-black font-bold w-8 h-8 flex items-center justify-center rounded-full">
            A
          </div>
          <span>Quảng Nam</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-green-200 text-black font-bold w-8 h-8 flex items-center justify-center rounded-full">
            C
          </div>
          <span>Đà Nẵng</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-green-200 text-black font-bold w-8 h-8 flex items-center justify-center rounded-full">
            B
          </div>
          <span>Quảng Ngãi</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-green-200 text-black font-bold w-8 h-8 flex items-center justify-center rounded-full">
            D
          </div>
          <span>Hội An</span>
        </div>
      </div>
    </div>
  )
}

export default QuestionOutput