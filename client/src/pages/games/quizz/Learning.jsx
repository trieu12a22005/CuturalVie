import React from "react";
import QuizHeader from "../../../components/Game/headerGame";
import Slider from "../../../components/quizzGame/Slider";
import VanMieuInfo from "../../../components/quizzGame/Info";

function Learning() {
  return (
    <>
      <QuizHeader />
      <div className=" w-[90%] left-1/2  p-6  -translate-x-1/2 bg-[#EBFFEB] rounded-2xl fixed top-20 h-[82%]">
        <h2 className="text-xl font-semibold bg-purple-200 px-4 py-2 rounded-2xl w-fit mx-auto">
          Khơi nguồn tri thức
        </h2>

        <img
          className=" absolute -bottom-3 -left-3"
          src="/character/dragon.png"
        />
        <div className=" flex  mt-3 items-center">
          <Slider />
          <VanMieuInfo />
        </div>
      </div>
    </>
  );
}

export default Learning;
