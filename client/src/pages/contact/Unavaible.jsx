import React from 'react'
import Header from '../../components/Header/Header'
import { useNavigate } from 'react-router-dom';

function Unavaible() {
    const navigate = useNavigate();
  return (
    <div className="bg-cover bg-center bg-[url('/bg/bgHome.jpg')] text-white min-h-screen">
        <Header tab={"/contact"} />
        <div className="flex flex-col items-center justify-center h-full text-center p-4 mt-10">
          <h2 className="text-2xl font-bold text-white mb-2">
            Nội dung hiện chưa có
          </h2>
          <p className="text-white">
            Chúng tôi sẽ cập nhật trong thời gian sớm nhất!
          </p>
          <button
        onClick={() => navigate(-1)}
        className="px-6 mt-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow"
      >
        Quay lại
      </button>
        </div>
        
      </div>
  )
}

export default Unavaible