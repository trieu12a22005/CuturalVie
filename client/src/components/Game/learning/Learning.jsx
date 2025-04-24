import React, { useEffect, useState } from "react";
import QuizHeader from "../headerGame";
import Slider from "./Slider";
import VanMieuInfo from "./Info";
import { motion } from "framer-motion";
import AIAssistantModal from "../../AI/Assistance";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { increase } from "../../../store/countSlice";
function Learning() {
  let { game_type } = useParams();
  const [info, setInfo] = useState();
  const count = useSelector((state) => state.count.value);
  const navigate = useNavigate();
  const location = useLocation();
  const gameId = location.state.gameId;
  const dispatch = useDispatch();
  const gameTypeId = location.state.id;
  useEffect(() => {
    function fetchData() {
      fetch(
        `https://viet-cultural-be.vercel.app/api/v1/afterInfo/get-afterInfo?gameTypeId=${gameTypeId}&gameId=${gameId}`,
        {
          method: "POST",
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setInfo(data.topic);
        })
        .catch((error) => {
          console.error("Lỗi khi fetch:", error);
        });
    }
    fetchData();
  }, []);
  const handleClick = () => {
    dispatch(increase());
    navigate("/" + `${game_type}`);
  };
  return (
    <>
      <QuizHeader />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-[90%] left-1/2 p-6 -translate-x-1/2 bg-[#EBFFEB] rounded-2xl fixed top-26 h-[80%]"
      >
        <h2 className="text-xl font-semibold bg-purple-200 px-4 py-2 rounded-2xl w-fit mx-auto">
          Khơi nguồn tri thức
        </h2>

        <img
          className="absolute -bottom-3 -left-3"
          src="/character/dragon.png"
        />

        <div className="flex mt-3 items-center">
          <Slider image={info?.link} />
          {info?.slides &&
            Array.isArray(info.slides) &&
            info.slides.length > 0 && <VanMieuInfo text={info.slides} />}
        </div>
        <button
          className="ml-[86%] px-[35px] py-[15px] font-bold rounded-md"
          style={{ backgroundColor: "#14AE5C" }}
          onClick={handleClick}
        >
          Câu tiếp theo
        </button>
      </motion.div>
      {/* <AIAssistantModal/> */}
    </>
  );
}

export default Learning;
