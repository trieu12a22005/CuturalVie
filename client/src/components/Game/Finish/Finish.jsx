import React from "react";
import QuizHeader from "../headerGame";
import Winning from "./Winning";

function Finish() {
  return (
    <>
      <QuizHeader isFinish={true} />
      <Winning />
      <button className="fixed rounded-lg font-bold px-3 py-4 bg-[#14ae5c]  inline-block w-fit bottom-[10%] right-[10%] transition-transform duration-300 hover:bg-[#0e8c47] hover:scale-105">
        Hành trình tiếp
      </button>
    </>
  );
}

export default Finish;
