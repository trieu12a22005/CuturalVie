import React from "react";

function Begin() {
  return (
    <div className=" overflow-hidden relative w-full h-screen bg-[url('Background.png')] bg-cover bg-center flex items-center justify-center">
      <div className=" relative">
        <img src="logo.png" alt="Vietcutural" className="" />
        <button className="absolute left-1/2 -translate-x-1/2 bottom-[25%] bg-green-200 px-6 py-3 rounded-lg shadow-lg text-black font-bold text-2xl">
          Khám phá ngay!
        </button>
      </div>
    </div>
  );
}

export default Begin;
