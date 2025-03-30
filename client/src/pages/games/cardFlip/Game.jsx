import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Each text card has a corresponding image card
const cardsData = [
  { type: "text", value: "Chầu Văn", matchGroup: 1 }, { type: "image", value: "/images/chau_van.jpg", matchGroup: 1 },
  { type: "text", value: "Hát Xoan", matchGroup: 2 }, { type: "image", value: "/images/hat_xoan.jpg", matchGroup: 2 },
  { type: "text", value: "Ca Trù", matchGroup: 3 }, { type: "image", value: "/images/ca_tru.jpg", matchGroup: 3 },
  { type: "text", value: "Hội Gióng", matchGroup: 4 }, { type: "image", value: "/images/hoi_giong.jpg", matchGroup: 4 },
  { type: "text", value: "Quan họ", matchGroup: 5 }, { type: "image", value: "/images/quan_ho.jpg", matchGroup: 5 },
  { type: "text", value: "Múa rối", matchGroup: 6 }, { type: "image", value: "/images/mua_roi.jpg", matchGroup: 6 }
];

const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

export default function MemoryGame() {
  const [cards, setCards] = useState(shuffleArray([...cardsData]));
  const [flipped, setFlipped] = useState([]); 
  const [matched, setMatched] = useState([]); 

  useEffect(() => {
    if (flipped.length === 2) {
      const [firstIndex, secondIndex] = flipped;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.matchGroup === secondCard.matchGroup && firstCard.type !== secondCard.type) {
        setMatched((prev) => [...prev, firstIndex, secondIndex]); // Mark as matched
      }

      setTimeout(() => setFlipped([]), 800);
    }
  }, [flipped, cards]);

  const handleFlip = (index) => {
    if (matched.includes(index)) return; 
    if (flipped.includes(index)) {
      setFlipped(flipped.filter(i => i !== index)); 
    } else if (flipped.length < 2) {
      setFlipped([...flipped, index]); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  p-4">
      <h1 className="text-3xl font-bold mb-4">Memory Game</h1>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="relative w-24 h-24 cursor-pointer perspective"
            onClick={() => handleFlip(index)}
            animate={{ rotateY: flipped.includes(index) || matched.includes(index) ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front (Text or Image, visible when flipped) */}
            <div className="absolute inset-0 w-full h-full bg-white flex items-center justify-center rounded-xl text-black font-bold shadow-lg"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
              {card.type === "text" ? card.value : <img src={card.value} alt="memory card" className="w-full h-full object-cover rounded-xl" />}
            </div>
            {/* Back (Gray side, initially visible) */}
            <div className="absolute inset-0 w-full h-full bg-gray-600 rounded-xl shadow-lg"
              style={{ backfaceVisibility: "hidden" }}>
            </div>
          </motion.div>
        ))}
      </div>
      {matched.length === cards.length && (
        <div className="mt-4 text-xl text-green-600 font-bold">Congratulations! 🎉</div>
      )}
      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" 
        onClick={() => { setCards(shuffleArray([...cardsData])); setFlipped([]); setMatched([]); }}>
        Restart
      </button>
    </div>
  );
}
