import React, { useEffect } from "react";
import VanMieuInfo from "../../../components/quizzGame/Info";
import QuizHeader from "../../../components/quizzGame/headerGame";
import ImageSlider from "../../../components/quizzGame/slider";
import { useDispatch, useSelector } from "react-redux";
import { increase } from "../../../store/countSlice";
import { useNavigate } from "react-router-dom";

function Information() {
  const count = useSelector((state) => state.count.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    fetch("http://localhost:3000/information")
    .then((res) =>res.json())
  })
  const handleClick = () =>{
    dispatch(increase());
    console.log(count)
    navigate("/game_4")
  }
  return (
    <>
      <QuizHeader />
      <div className=" w-[90%] left-1/2  p-6  -translate-x-1/2 bg-[#EBFFEB] rounded-2xl fixed top-20 h-[82%]">
        <h2 className="text-xl font-semibold bg-purple-200 px-4 py-2 rounded-2xl w-fit mx-auto">
          Khơi nguồn tri thức
        </h2>
        <img
          className=" absolute -bottom-3 -left-3"
          src="/information_1/Character.png"
        />
        <div className=" flex  mt-3 items-center">
          <ImageSlider />
          <VanMieuInfo />
        </div>
        <button
              className="mt-6 ml-[1200px] block disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleClick}
            >
              <span
                className=" px-[20px] py-[15px] font-bold rounded-md"
                style={{ backgroundColor: "#14AE5C" }}
              > 
                Câu hỏi tiếp
              </span>
            </button>
      </div>
    </>
  );
}

export default Information;