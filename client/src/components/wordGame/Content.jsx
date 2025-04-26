import React, { useEffect, useState } from "react";
import { motion, progress } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../quizzGame/Modal";
import { formatTime } from "../../utils/quizz";
import { initProgress, updateProgress } from "../../store/countSlice";

function Content() {
  const [question, setQuestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [second, setSecond] = useState(6000);
  const [modal, setModal] = useState(null);
  const [display, setDisplay] = useState(false);
  const [values, setValues] = useState([]);
  const [letterChoices, setLetterChoices] = useState([]);
  const navigate = useNavigate();
  let dispatch=useDispatch()
  const count = useSelector((state) => state.count.value);
  let {region}= useSelector((state) => state.region);
  useEffect(() => {
    fetch(
      `https://viet-cultural-be.vercel.app/api/v1/game/get-gamedata?regionId=${region}&gameType=word`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuestions(data);
        dispatch(initProgress(data))
      })
      .catch((error) => {
        console.error("Lỗi khi fetch:", error);
      });
  }, []);

  const currentQues = question[count];

  useEffect(() => {
    if (currentQues?.correct_letters) {
      setValues(Array(currentQues.correct_letters.length).fill(""));
      setLetterChoices(currentQues.letters);
    }
  }, [currentQues]);

  useEffect(() => {
    if (second <= 0) {
      const isEqual =
        JSON.stringify(values) === JSON.stringify(currentQues?.correct_letters);
      setModal(isEqual ? "correct" : "wrong");
      setDisplay(true);
      const audio = new Audio(`sound/${isEqual ? "correct" : "wrong"}.mp3`);
      audio.play();
      setSubmitted(true);
      return;
    }
    const timer = setTimeout(() => {
      setSecond((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [second]);

  const handleInfo = () => {
    navigate(`/information`, {
      state:{
        gameId: 4,
        id: question[count].id
      }
    });
  }

  const handleClick = (letter, index) => {
    const newValues = [...values];
    const newChoices = [...letterChoices];

    for (let i = 0; i < newValues.length; i++) {
      if (newValues[i] === "") {
        newValues[i] = letter;
        newChoices[index] = "";
        break;
      }
    }

    setValues(newValues);
    setLetterChoices(newChoices);
  };

  const handleDelete = (index) => {
    const letterToRestore = values[index];
    const newValues = [...values];
    const newChoices = [...letterChoices];

    const emptyIndex = newChoices.findIndex((l) => l === "");
    if (emptyIndex !== -1) {
      newChoices[emptyIndex] = letterToRestore;
    }

    newValues[index] = "";
    setValues(newValues);
    setLetterChoices(newChoices);
  };

  const handleSubmit = () => {
    const isEqual =
      JSON.stringify(values) === JSON.stringify(currentQues?.correct_letters);
    setModal(isEqual ? "correct" : "wrong");
    dispatch(updateProgress(isEqual ? true : false))
    setDisplay(true);
    const audio = new Audio(`sound/${isEqual ? "correct" : "wrong"}.mp3`);
    audio.play();
    setSubmitted(true);
  };
  console.log(count,progress.length);
  return (
    <>
      {display ? (
        <Modal modal={modal} />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-green-100 p-10 rounded-3xl shadow-md w-full max-w-[552px] min-h-[290px] mx-auto mt-10"
        >
          <div className="bg-green-300 px-4 py-1 rounded-full w-fit mx-auto">
            <h2 className="text-black font-bold">{`Câu hỏi ${count + 1}`}</h2>
          </div>

          <p className="text-center text-lg font-semibold text-black mt-6">
            {currentQues?.question}
          </p>

          <div className="flex text-center w-[480px] flex-wrap justify-center gap-1">
            {values.map((val, index) => (
              <input
                key={index}
                value={val}
                onClick={() => handleDelete(index)}
                readOnly
                className={`w-[50px] outline-0 h-[50px] border-[#14AE5C] bg-[#E2FFDD] cursor-pointer border text-center text-xl rounded-[20px] 
        shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.6)] 
        ${val === "" ? "text-transparent" : "text-black"}`}
              />
            ))}
          </div>
        </motion.div>
      )}

      <div className="bg-white min-h-[282px] rounded-t-2xl overflow-hidden shadow-md mt-auto">
        <div className="bg-[#009951] text-white p-3 flex">
          {submitted ? (
            <span className="bg-green-300 text-black px-4 py-1 rounded-full font-bold ml-[680px] mr-[600px]">
              {currentQues?.answer}
            </span>
          ) : (
            <span className="bg-green-300 text-black px-4 py-1 rounded-full font-semibold ml-[90vw]">
              {formatTime(second)}
            </span>
          )}
        </div>

        <div className="p-6">
          <div className="flex text-center w-[800px] ml-[22vw] mt-[-5vh] flex-wrap justify-center gap-1">
            {letterChoices.map((letter, index) =>
              letter !== "" ? (
                <div
                  key={index}
                  className="w-[50px] h-[50px] mt-[10vh] border-[#14AE5C] bg-[#E2FFDD] border text-center flex items-center justify-center text-xl rounded-[20px] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.6)] cursor-pointer"
                  onClick={() => handleClick(letter, index)}
                >
                  {letter}
                </div>
              ) : null
            )}
          </div>

          {submitted ? (
            <button
              onClick={handleInfo}
              className="mt-[2vh] ml-[85vw] block disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span
                className="px-[35px] py-[15px] font-bold rounded-md"
                style={{ backgroundColor: "#14AE5C" }}
              >
                Tiếp tục
              </span>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="mt-10 text-center mx-auto block disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="bg-red-300 text-red-700 px-4 py-2 rounded-full font-semibold">
                Nếu chắc chắn hãy chọn tôi
              </span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Content;
