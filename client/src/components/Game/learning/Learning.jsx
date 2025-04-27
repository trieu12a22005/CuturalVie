import React, { useEffect, useState } from "react";
import QuizHeader from "../headerGame";
import Slider from "./Slider";
import LearningInfo from "./Info";
import AIAssistantModal from "../../AI/Assistance";
import { MessageSquare } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { increase } from "../../../store/countSlice";
import { increasePuzzle } from "../../../store/puzzle";
import AIProvider from "../../AI/AIProvider";
import { Spin } from "antd";
import {notifyError} from '../../../utils/notify'
import { getTotalists } from "../../../utils/quizz";

let lists = [null, "game_1", "game2/play", "game3/play", "game_4"];
let storename = [null, "count", "puzzle", "card", "count"];
let increaseLists = [null, increase, increasePuzzle, null, increase];

function Learning() {
  const [open, setOpen] = useState(false);
  const [chatData, setChatdata] = useState(null);
  const [info, setInfo] = useState();
  const [loading, setLoading] = useState(true); // ✅ Loading state

  const navigate = useNavigate();
  const location = useLocation();
  const gameId = location.state.id;
  const gameTypeId = location.state.gameId;
  const dispatch = useDispatch();
  let state = useSelector((state) => state[storename[gameTypeId]]);
  let current = state.current >= 0 ? state.current : state.value;

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // ✅ Bắt đầu loading
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/afterInfo/get-afterInfo?gameTypeId=${gameTypeId}&gameId=${gameId}`,
          {
            method: "POST",
            credentials: "include",
          }
        );
        const data = await res.json();
       if (data) setInfo(data?.topic);
       else throw new Error()
      } catch (error) {
        navigate(-1);
        notifyError("Hiện chưa có thông tin về phần này!")
      
      } finally {
        setLoading(false); // ✅ Luôn tắt loading dù thành công hay lỗi
      }
    }
    fetchData();
  }, []);

  const handleClick = () => {
    let totalLists = getTotalists();
    if (gameTypeId === 3) return navigate(`/${lists[gameTypeId]}`);
    if (current >= totalLists[gameTypeId] - 1) {
      let Trueones = state.progress.reduce(
        (acc, item) => (item ? 1 : 0) + acc,
        0
      );
      let status;
      if (gameTypeId === 3) status = state.modal;
      if (Trueones >= totalLists[gameTypeId] / 2) status = "win";
      else status = "fail";
      let game3desc = "Bạn đã hoàn thành tốt game!";
      navigate("/finish", {
        state: {
          result: status,
          description:
            gameTypeId === 3
              ? game3desc
              : `Bạn đã hoàn thành ${Trueones}/${totalLists[gameTypeId]} câu`,
        },
      });
      return;
    }
    dispatch(increaseLists[gameTypeId]());
    navigate(`/${lists[gameTypeId]}`);
  };

  return (
    <>
      <QuizHeader count={current} progress={state.progress} />

      {loading ? (
        <div className="flex justify-center items-center min-h-[80vh]">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {/* Nội dung chính */}
          <div className="w-[90%] left-1/2 p-6 -translate-x-1/2 bg-[#EBFFEB] rounded-2xl fixed top-26 h-[80%]">
            <h2 className="text-xl font-semibold bg-purple-200 px-4 py-2 rounded-2xl w-fit mx-auto">
              Khơi nguồn tri thức
            </h2>

            <img
              className="absolute -bottom-3 -left-3"
              src="/character/dragon.png"
            />

            <div className="flex gap-12 mt-3 items-center">
              <Slider image={info?.link} />
              {info?.slides &&
                Array.isArray(info.slides) &&
                info.slides.length > 0 && (
                  <AIProvider>
                    <LearningInfo setChatdata={setChatdata} text={info.slides} />
                  </AIProvider>
                )}
            </div>

            <button
              className="ml-[86%] mt-5 px-[35px] bg-[#14AE5C] py-[15px] font-bold rounded-lg"
              onClick={handleClick}
            >
              {gameTypeId === 3 ? "Trở Về" : "Câu tiếp theo"}
            </button>
          </div>

          {/* Chat button */}
          <button
            className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition duration-300 flex items-center space-x-2"
            onClick={() => setOpen(!open)}
          >
            <MessageSquare className="w-6 h-6" />
            <span className="text-sm">Chat cùng AI</span>
          </button>

          <AIAssistantModal open={open} setOpen={setOpen} chatData={chatData} />
        </>
      )}
    </>
  );
}

export default Learning;
