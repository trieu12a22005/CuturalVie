import {
  FaPlay,
  FaVolumeUp,
  FaHome,
  FaCheck,
  FaVolumeMute,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAudio } from "../../context/AudioContext";
const QuizHeader = ({ progress = [], count = 0, isFinish }) => {
  let { isPlaying, setIsPlaying } = useAudio();

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-b-2xl shadow-md w-full relative z-50">

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
        {isFinish ? "Tổng kết" : ` Câu ${count + 1}`}
      </span>

      {/* Icons */}
      <div className="flex items-center gap-6 text-[#009951] text-2xl mr-5">
        <Link to={"/home"}>
          {" "}
          <FaHome size={30} />
        </Link>
        
        {isPlaying ? (
          <FaVolumeUp size={30} onClick={() => setIsPlaying(false)} />
        ) : (
          <FaVolumeMute size={30} onClick={() => setIsPlaying(true)} />
        )}
      </div>
    </div>
  );
};

export default QuizHeader;
