import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { FaPlay, FaVolumeUp, FaHome, FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
const QuizHeader = ({ísFinish}) => {
  const {progress,current} =  useSelector(state=>state.quizz);
  
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-b-2xl shadow-md relative">
      {/* Progress Circles */} 
     
        <div className="flex items-center gap-3">
          {progress.map((status, i) => (
            <div
              key={i}
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-lg font-bold ${
                status === true
                  ? "border-green-500 text-green-500"
                  : status == false
                  ? "border-red-500 text-red-500"
                  : "border-black text-black"
              }`}
            >
              {status === true ? <FaCheck size={20} /> : null}
              {status === false ? <IoClose size={20} /> : null}
            </div>
          ))}
        </div>

        {/* Question Label */}
        <span className="bg-green-200 text-green-900 px-4 py-2 rounded-full font-bold text-base absolute left-1/2 -translate-x-1/2">
          Câu {current+1}
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

export default QuizHeader;
