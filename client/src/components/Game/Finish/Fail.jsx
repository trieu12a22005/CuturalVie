import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reset } from '../../../store/countSlice';
import { resetPuzzle } from '../../../store/puzzle';
import { resetCard } from '../../../store/Card';
const paths = {
  1: "/quizz/rule",
  2: "/game2/rule",
  3: "/game3/rule",
  4: "/word/rule",
};
function Fail({desc}) {
  let navigate=useNavigate()
  let {currentGame}=useSelector(state=>state.region)
  let dispatch=useDispatch()
  let handlePlayAgain=()=>{
    dispatch(reset());
        dispatch(resetPuzzle());
        dispatch(resetCard());
      navigate(paths[currentGame])
  }
  let handleClick=()=>{
    navigate("/trip")
}
  return (
    <div className=" relative flex justify-center items-center w-lg bg-green-100 mt-8 mx-auto min-h-[570px] min-w-[700px] rounded-2xl gap-10">
    <div className="text-center w-full max-w-md">
      {/* Header Message */}
      <p className="bg-yellow-200 text-black font-semibold text-2xl py-2 px-4 rounded-xl inline-block">
        Rất tiếc, ngôi sao hẹn bạn dịp khác!
      </p>

      {/* Modal Box */}
      <div className="bg-[#f5f5f5] border border-gray-400  mt-12 shadow-lg h-[300px]">
        {/* Modal Header */}
        <div className="bg-[#27174E] text-white flex justify-between items-center px-4 py-2">
          <span></span>
          <button><img src="/items/close.png" alt="" /></button>
        </div>

        {/* Modal Content */}
        <div className=" flex flex-col gap-15 justify-center items-center h-[100%] ">
          <p className="text-black font-bold text-lg">{desc}</p>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <button onClick={handlePlayAgain} className="bg-red-200 px-4 py-2 rounded-md font-semibold shadow-md hover:bg-red-300">
              Chơi lại nhé
            </button>
            <button onClick={handleClick} className="bg-green-600  px-4 py-2 rounded-md font-semibold shadow-md hover:bg-green-700">
              Hành trình tiếp
            </button>
          </div>
        </div>
      </div>
    </div>
      <img className=' absolute bottom-[-10%] right-[85%]' src="/character/character3.png" alt="" />
  </div>
  )
}

export default Fail