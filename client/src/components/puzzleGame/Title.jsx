import React, { useEffect, useRef } from "react";
import { FaClock } from "react-icons/fa";
import { CountDown } from "../../store/puzzle";
import { useDispatch, useSelector } from "react-redux";
import { formatTime } from "../../utils/quizz";
function Title() {
  let {seconds,current,puzzles}=useSelector(state=>state.puzzle)
  let hint=puzzles[current].hint
  let dispatch=useDispatch()
  let timer=useRef()
 useEffect(()=>{
     timer.current=setInterval(()=>{
       console.log('object');
       dispatch(CountDown(timer.current))
     },1000)
      return ()=>clearInterval(timer.current)
   },[])
  return (
    <div className="flex mx-auto w-fit gap-2 items-center text-[20px] relative">
      {/* Hint Text */}
      <div className=" bg-green-100 text-black p-4 rounded-2xl shadow-md max-w-[400px] text-center">
        <span className="bg-green-300 text-green-900 font-semibold px-3 py-1 rounded-full">
          Gợi ý
        </span>
        <p className="mt-2 font-medium">
         {hint}
        </p>
      </div>

      {/* Timer */}
      <div className="flex flex-col items-center space-x-2 absolute left-[calc(100%+20px)]">
        <FaClock size={32} color="white" />
        <span className=" text-white text-xl font-semibold">{formatTime(seconds)}</span>
      </div>
    </div>
  );
}

export default Title;
