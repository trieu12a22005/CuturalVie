import React, { useEffect } from "react";
import VanMieuInfo from "../quizzGame/Info";
import ImageSlider from "../quizzGame/slider";
import { useDispatch, useSelector } from "react-redux";
import { increase } from "../../store/countSlice";
import { useNavigate, useParams } from "react-router-dom";
import QuizHeader from "./headerGame";

function Information() {
  let {game_type}=useParams()
  const count = useSelector((state) => state.count.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const handleClick = () =>{
    dispatch(increase());
    navigate("/"+`${game_type}`)
  }
  return (
    <>
      <QuizHeader/>
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
              className="mt-10 ml-[1050px] block disabled:opacity-50 disabled:cursor-not-allowed"
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