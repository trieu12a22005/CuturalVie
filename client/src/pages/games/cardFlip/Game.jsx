import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Congra from "../../../components/Game/Congra";
import { useDispatch, useSelector } from "react-redux";
import { setMatched, winGame } from "../../../store/Card";
import { useNavigate } from "react-router-dom";

export default function CardGame({ ref }) {
  const { cards, modal, seconds, matched } = useSelector((state) => state.card);
  const [flipped, setFlipped] = useState([]);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (flipped.length === 2) {
      const [firstIndex, secondIndex] = flipped;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (
        firstCard.matchGroup === secondCard.matchGroup &&
        firstCard.type !== secondCard.type
      ) {
        dispatch(setMatched([firstIndex, secondIndex]));
      }

      setTimeout(() => setFlipped([]), 800);
    }
  }, [flipped]);
  useEffect(() => {
    if (seconds && matched.length == cards.length && !modal) {
      clearInterval(ref.current);
      dispatch(winGame());
    }
  }, [matched, seconds]);

  const handleFlip = (index) => {
    if (modal) {
      let id = cards[index].id;
      if (cards[index].type == "image")
        id = cards.find(
          (item) =>
            item.matchGroup == cards[index].matchGroup && item.type == "text"
        ).id;
      navigate(`/information`, {
        state: {
          gameId: 3,
          id,
        },
      });
    }
    if (matched.includes(index)) return;
    if (flipped.includes(index)) {
      setFlipped(flipped.filter((i) => i !== index));
    } else if (flipped.length < 2) {
      setFlipped([...flipped, index]);
    }
  };
  const handleClick = () => {
    navigate("/finish", {
      state: {
        result: modal,
        description:
          modal == "win"
            ? "bạn đã hoàn thành tốt trò chơi"
            : "Hãy cố gắng những lần sau nhé<3",
      },
    });
  };
  return (
    <div className="flex flex-col items-center justify-center  p-4 relative z-10">
      <h2 className="rounded-3xl font-bold my-5 px-7 py-3 bg-green-200">
        Kết nối kho báu
      </h2>

      <div className="grid grid-cols-4 gap-2 ">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="relative w-24 h-24 cursor-pointer perspective"
            onClick={() => handleFlip(index)}
            animate={{
              rotateY:
                flipped.includes(index) || matched.includes(index) ? 180 : 0,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front (Text or Image, visible when flipped) */}
            <div
              className="absolute inset-0 w-full h-full bg-gradient-to-br from-yellow-200 to-pink-300 flex items-center justify-center rounded-xl text-black font-bold shadow-lg"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              {card.type === "text" ? (
                card.value
              ) : (
                <img
                  src={card.imageUrl}
                  className="w-full h-full object-cover rounded-xl"
                />
              )}
            </div>
            {/* Back (Gray side, initially visible) */}
            <div
              className="absolute inset-0 w-full h-full bg-gray-600 rounded-xl shadow-lg"
              style={{ backfaceVisibility: "hidden" }}
            ></div>
          </motion.div>
        ))}
      </div>

      {modal && <Congra type={modal} />}
      {modal && (
        <button
          onClick={handleClick}
          className="bg-green-400 hover:bg-green-500 transition-colors duration-300 w-fit block mt-5 text-white font-bold px-4 py-2 rounded-full mx-auto"
        >
          Tổng Kết
        </button>
      )}
    </div>
  );
}
//bg-gradient-to-br from-yellow-200 to-pink-300
