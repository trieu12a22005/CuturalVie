import { useDispatch, useSelector } from "react-redux";
import { selectAns, submitAns } from "../../store/countSlice";
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

      
    </div>
  );
}
