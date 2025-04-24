import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Congra from "../../../components/Game/Congra";
import { useDispatch, useSelector } from "react-redux";
import { setMatched, winGame } from "../../../store/Card";

export default function CardGame({ref}) {
 const {cards,modal,seconds,matched}=useSelector(state=>state.card)
  const [flipped, setFlipped] = useState([]);
  
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
  useEffect(()=>{
      if (seconds && matched.length==cards.length) {
        clearInterval(ref.current)
           dispatch(winGame())
      }
     
  },[matched,seconds])

  const handleFlip = (index) => {
    console.log(index);
    if (matched.includes(index) || modal) return;
    if (flipped.includes(index)) {
      setFlipped(flipped.filter((i) => i !== index));
    } else if (flipped.length < 2) {
      setFlipped([...flipped, index]);
    }
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
                  src={card.value}
                  alt={card.value.slice(card.value.lastIndexOf('/')+1)}
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
  
     {modal &&  <Congra type={modal}/>}
    </div>
  );
}
