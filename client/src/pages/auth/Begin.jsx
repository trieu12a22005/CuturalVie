import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Begin() {
  const navigate = useNavigate();
  const [showMainContent, setShowMainContent] = useState(false); // ⚡ Ẩn giao diện chính lúc đầu

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMainContent(true); // Sau 2 giây thì mới hiện giao diện chính
    }, 4000);

    return () => clearTimeout(timer); // Clear timeout nếu rời trang
  }, []);

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <div className="overflow-hidden relative w-full h-screen flex items-center justify-center">
      {/* Nếu chưa show thì hiện background intro */}
      {!showMainContent && (
        <div className="absolute inset-0 bg-[url('/bg/bgstart.png')] bg-cover bg-center z-10"></div>
      )}

      {/* Khi đã show thì hiện giao diện chính */}
      {showMainContent && (
        <div className="absolute inset-0 bg-[url('/Background.png')] bg-cover bg-center z-20 flex items-center justify-center">
          <div className="relative">
            <img src="/logo/logo.png" alt="Vietcutural" className="" />
            <button
              className="absolute left-1/2 -translate-x-1/2 bottom-[25%] bg-green-200 px-6 py-3 rounded-lg shadow-lg text-black font-bold text-2xl"
              onClick={handleClick}
            >
              Khám phá ngay!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Begin;
