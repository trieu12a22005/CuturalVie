import React from "react";
import QuizHeader from "../headerGame";
import Winning from "./Winning";
import { useLocation, useNavigate } from "react-router-dom";
import Fail from "./Fail";
function Finish() {
  const location = useLocation();
  const result = location.state?.result ?? null;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/trip");
  };
  return (
    <>
      <QuizHeader isFinish={true} />
      {result === "win" && (
        <>
          <Winning />
        </>
      )}

      {result === "fail" && (
        <>
          <Fail />
        </>
      )}
      <button
        className="fixed rounded-lg font-bold px-3 py-4 bg-[#14ae5c]  inline-block w-fit bottom-[10%] right-[10%] transition-transform duration-300 hover:bg-[#0e8c47] hover:scale-105"
        onClick={handleClick}
      >
        Hành trình tiếp
      </button>
    </>
  );
}

export default Finish;
