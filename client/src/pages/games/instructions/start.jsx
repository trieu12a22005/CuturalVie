import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "tailwindcss";
import { useAudio } from "../../../context/AudioContext";
function Start() {
  const { setIsPlaying } = useAudio();
  const navigate = useNavigate();
  const handleClick = () =>{
    setIsPlaying(true);
    navigate("/instructions_1")
  }
  return (
    <div className=" overflow-hidden relative w-full h-screen bg-[url('Background.png')] bg-cover bg-center flex items-center justify-center">
      <div className=" relative">
        <img src="/logo/logo.png" alt="Vietcutural" className="" />
        <button className="absolute left-1/2 -translate-x-1/2 bottom-[25%] bg-green-200 px-6 py-3 rounded-lg shadow-lg text-black font-bold text-2xl" onClick={handleClick} >
         Chơi ngay
        </button>
      </div>
    </div>
  );
}

export default Start;
