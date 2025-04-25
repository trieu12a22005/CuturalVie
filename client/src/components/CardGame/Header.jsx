import { useEffect, } from "react";
import { FaPlay, FaVolumeUp, FaHome} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { formatTime } from "../../utils/quizz";
import { CountDown } from "../../store/Card";

const CardGameHeader = ({ref}) => {
  let {seconds}=useSelector(state=>state.card)
  let dispatch=useDispatch()
  console.log(ref.current);
  useEffect(()=>{
    ref.current=setInterval(()=>{
      dispatch(CountDown(ref.current))
    },1000)
     return ()=>clearInterval(ref.current)
     
  },[])
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-b-2xl shadow-md relative z-10">
      {/* Progress Circles */} 
     
        {/* Question Label */}
        <span className="bg-green-200 text-green-900 px-4 py-2 rounded-full font-bold text-base ">
            {formatTime(seconds)}
        </span>
     

      {/* Icons */}
      <div className="flex items-center gap-4 text-[#009951] text-2xl">
        <FaPlay />
        <FaVolumeUp />
        <FaHome />
      </div>
    </div>
  );
};

export default CardGameHeader;
