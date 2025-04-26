import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

function QuizzLayout() {
  const {region}=useSelector(state=>state.region)
  const image = `/bgRegion/bg${region}.png` ||`/bgRegion/bg${region}.jpg` ; // đúng file bạn vừa upload

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col">
      {/* Lớp nền tối + rõ nét */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-[0.4] scale-105"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      {/* Lớp nội dung trên nền */}
      <div className="relative z-10 flex flex-col h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default QuizzLayout;
