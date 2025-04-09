import { useDispatch, useSelector } from "react-redux";
import { selectAns, submitAns } from "../../store/quizz";
import { formatTime, handleClassName } from "../../utils/quizz";
import { useEffect, useRef, useState } from "react";

export default function QuizAnswer() {
  let [second, setSecond] = useState(10);
  let { current, questions, selected, modal } = useSelector(
    (state) => state.quizz
  );
  let dispatch = useDispatch();
  let { options } = questions[current];
  let timer=useRef()
  let handleChoose = (letter) => {
    dispatch(selectAns(letter));
  };
  let handleSubmit = () => {
    clearTimeout(timer.current)
    dispatch(submitAns());
  };
 
  useEffect(() => {
   
    timer.current = setTimeout(() => {
      setSecond(second-1);
    }, 1000);
    if (second<=0) {
      clearTimeout(timer.current);
      if (!selected)  handleChoose("A")
      handleSubmit()
    }
    return () => clearTimeout(timer.current);
  }, [second]);
  return (
    <div className="bg-white min-h-[282px] rounded-t-2xl overflow-hidden  shadow-md mt-auto">
      <div className="bg-[#009951] text-white p-3  flex justify-between items-center">
        <span className="bg-green-300 text-black px-4 py-1 rounded-full font-semibold">
          Hãy chọn đáp án đúng
        </span>
        <span className="bg-green-300 text-black px-4 py-1 rounded-full font-semibold">
          {formatTime(second)}
        </span>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mx-auto w-[80%]">
          {Object.keys(options).map((letter) => (
            <div key={letter} className="flex items-center gap-3">
              <button
                disabled={modal}
                onClick={() => handleChoose(letter)}
                className={`text-black font-bold text-lg w-12 h-12 flex items-center justify-center rounded-full ${handleClassName(
                  letter
                )}`}
              >
                {letter}
              </button>

              <button
                disabled={modal}
                onClick={() => handleChoose(letter)}
                className="bg-green-200 px-6 py-3 rounded-full font-semibold flex-1"
              >
                {options[letter]}
              </button>
            </div>
          ))}
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={!selected || modal}
          className="mt-10 text-center mx-auto block disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="bg-red-300 text-red-700 px-4 py-2 rounded-full font-semibold">
            Nếu chắc chắn hãy chọn tôi
          </span>
        </button>
      </div>
    </div>
  );
}
