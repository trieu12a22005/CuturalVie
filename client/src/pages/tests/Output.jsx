import React, { useState } from "react";
import Level from "../../components/tests/input/Level";
import Experience from "../../components/tests/input/Experience";
import QuestionOutput from "../../components/tests/output/Question";

export default function CultureLevelModal() {
  const [index, setIndex] = useState(0);
  let [ans, setAns] = useState({
    1: null,
    2: null,
    3: null,
  });
  let lists = [
    <Level setAns={setAns} />,
    
  ];
  let handleNext = () => {
    if (index < 7) {
      setIndex(index + 1);
    } else {
      console.log(ans);
    }
  };
  return (
    <>
      <div className="bg-white p-6 rounded-xl max-w-xl w-full shadow-md mt-7">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-4">
          Túi hành trang của bạn có gì rồi nhỉ?
        </h2>

        <QuestionOutput/>
        <div className="flex justify-between">
          <button
            onClick={() => setIndex(index - 1)}
            disabled={index === 0}
            className={`px-4 py-2 rounded-md font-semibold ${
              index === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            Câu trước
          </button>
          <button
            onClick={handleNext}
            className={`px-4 py-2 rounded-md font-semibold bg-green-500 text-white hover:bg-green-600`}
          >
            {index < 7 ? " Câu tiếp" : "Hoàn thành"}
          </button>
        </div>
      </div>
    </>
  );
}
