import React, { useEffect } from "react";
import QuizHeader from "../headerGame";
import Winning from "./Winning";
import { useLocation, useNavigate } from "react-router-dom";
import {useSelector } from "react-redux";
import Fail from "./Fail";
let storename=[null,"count","puzzle","card","word"]
function Finish() {
  const location = useLocation();
   const result = location.state?.result ?? null;
   const desc=location.state?.description || "bạn đã giành chiến thắng"
  const navigate = useNavigate();
  const nametrip = localStorage.getItem("trip");
  let {currentGame}=useSelector(state=>state.region)
  console.log(currentGame);
   let state=useSelector(state=>state[storename[currentGame]])
  const {region}=useSelector(state=>state.region)
  const handleClick = () => {
    navigate("/trip");
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://viet-cultural-be.vercel.app/api/v1/achievements/update-achievement/${region}`,
          {
            method: "PATCH",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              [nametrip]: true,
            }),
          }
        );
  
        const data = await response.json();
        console.log(data)
      } catch (error) {
        console.error("Lỗi khi fetch:", error);
      }
    }
  
    if (result === "win") fetchData();
  }, []);  
  return (
    <>
      <QuizHeader progress={state.progress} isFinish={true} />
      {result === "win" && (
        <>
          <Winning desc={desc} />
        </>
      )}

      {result != "win" && (
        <>
          <Fail desc={desc} />
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
