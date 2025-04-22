import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";
import {useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Question() {
  const [question, setQuestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [second, setSecond] = useState(10);
  const [modal, setModal] = useState(null);
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
    const { region } = location.state || {};
  useEffect(() => {
    function fetchData() {
      fetch(`https://viet-cultural-be.vercel.app/api/v1/game/get-gamedata?regionId=1&gameType=quiz`,
        {
          method: "GET",
          credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
          setQuestions(data.question);
        })
        .catch((error) => {
          console.error("Lỗi khi fetch:", error);
        });
    }
    fetchData();
  }, []);
  const count = useSelector((state) => state.count.value);
  const currentQues = question[count];
  useEffect(() => {
    if (submitted) return;
    if (second <= 0) {
      const auto = selected || "E";
      setSelected(auto);
      setSubmitted(true);
      setModal(auto === currentQues?.correctAnswer); // mở modal dựa trên kết quả
      return;
    }

    const timer = setTimeout(() => {
      setSecond((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [second, submitted, selected, currentQues]);

  const handleChoose = (letter) => {
    if (!submitted) {
      setSelected(letter);
    }
  };

  const handleSubmit = () => {
    if (!submitted && selected) {
      setSubmitted(true);
      const isCorrect = selected === currentQues?.correctAnswer;
      setModal(isCorrect ? "correct" : "wrong");
      setDisplay(true);
      const audio = new Audio(`sound/${isCorrect ? "correct" : "wrong"}.mp3`);
      audio.play();
    }
  };
  const handleInfo = () => {
    navigate(`/information/game_1`);
  };
  const formatTime = (sec) => {
    return `00:${sec.toString().padStart(2, "0")}`;
  };
  return (
    <>
      {/* Hiển thị modal kết quả nếu đã chọn và nộp */}
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
            <h2 className="text-black font-bold">{`Câu hỏi ${count+1}`}</h2>
          </div>

          <p className="text-center text-lg font-semibold text-black mt-6">
            {currentQues?.question}
          </p>
        </motion.div>
      )}

      <div className="bg-white min-h-[282px] rounded-t-2xl overflow-hidden shadow-md">
        <div className="bg-[#009951] text-white p-3 flex justify-between items-center">
          <span className="bg-green-300 text-black px-4 py-1 rounded-full font-semibold">
            Hãy chọn đáp án đúng
          </span>
          <span className="bg-green-300 text-black px-4 py-1 rounded-full font-semibold">
            {formatTime(second)}
          </span>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mx-auto w-[80%]">
            {currentQues?.options &&
              Object.keys(currentQues.options).map((letter) => (
                <div key={letter} className="flex items-center gap-3">
                  <button
                    onClick={() => handleChoose(letter)}
                    disabled={submitted}
                    className={`text-black font-bold text-lg w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200
    ${
      submitted
        ? selected === letter
          ? selected === currentQues.correctAnswer
            ? "bg-green-500" // Chọn đúng → xanh
            : "bg-red-500" // Chọn sai → đỏ
          : currentQues.correctAnswer === letter // so sánh được do trong database letter có key A,B,C,D
          ? "bg-green-500" // Không chọn nhưng đây là đáp án đúng → tô xanh
          : "bg-green-300" // Các nút còn lại → giữ nguyên
        : selected === letter
        ? "bg-yellow-300" // Khi đang chọn nhưng chưa nộp
        : "bg-green-300"
    }
  `}
                  >
                    {letter}
                  </button>

                  <button
                    onClick={() => handleChoose(letter)}
                    disabled={submitted}
                    className="bg-green-200 px-6 py-3 rounded-full font-semibold flex-1 text-left"
                  >
                    {currentQues.options[letter]}
                  </button>
                </div>
              ))}
          </div>
          {submitted ? (
            <button
              onClick={handleInfo}
              className="mt-6 ml-[1200px] block disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span
                className=" px-[35px] py-[15px] font-bold rounded-md"
                style={{ backgroundColor: "#14AE5C" }}
              >
                Tiếp tục
              </span>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!selected || submitted}
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

export default Question;
