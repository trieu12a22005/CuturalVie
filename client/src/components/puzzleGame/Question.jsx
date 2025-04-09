import React, { useState } from "react";
import Title from "./Title";
import { useDispatch, useSelector } from "react-redux";
import { handleWin } from "../../store/puzzle";
import { motion } from "framer-motion";


function PuzzleGame() {
  const {puzzles,current} =  useSelector(state=>state.puzzle);
  let dispatch=useDispatch()
  let puzzleData=puzzles[current]
  const [slots, setSlots] = useState(Array(9).fill(null));
  const [pieces, setPieces] = useState([...puzzleData.options]);

  const handleDragStart = (piece, index) => (event) => {
    event.dataTransfer.setData("pieceId", piece.id);
    event.dataTransfer.setData("sourceIndex", index);
  };
  let disabled = slots.every((item) => Boolean(item));
  const handleSlotDrop = (index) => (event) => {
    event.preventDefault();
    const pieceId = Number(event.dataTransfer.getData("pieceId"));
    const sourceIndex = event.dataTransfer.getData("sourceIndex");
    const piece = puzzleData.options.find((p) => p.id === pieceId);

    if (!piece) return;

    const newSlots = [...slots];
    const newPieces = [...pieces];

    if (sourceIndex === "null") {
      const existingPiece = newSlots[index];
      if (existingPiece) {
        newPieces.push(existingPiece);
      }
      newSlots[index] = piece;
      setPieces(newPieces.filter((p) => p.id !== pieceId));
    } else {
      const srcIdx = Number(sourceIndex);
      [newSlots[srcIdx], newSlots[index]] = [newSlots[index], newSlots[srcIdx]];
    }

    setSlots(newSlots);
  };

  const checkAnswer = () => {
    console.log(slots);
    const isCorrect = slots.every(
      (piece, i) => piece?.id === puzzleData.answer[i]
    );
   isCorrect ? dispatch(handleWin("win")) : dispatch(handleWin("lose"));
  };

  return (
    <motion.div
  initial={{ y: -50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="w-3xl mt-5 mx-auto"
>
  <Title />

  <div className="grid grid-cols-3 gap-2 relative w-fit mt-10 mx-auto">
    {slots.map((slot, index) => (
      <div
        key={index}
        className="w-24 h-24 bg-[#38363686] border"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleSlotDrop(index)}
      >
        {slot && (
          <img
            src={slot.piece}
            alt="puzzle"
            className="w-full h-full cursor-pointer"
            draggable
            onDragStart={handleDragStart(slot, index)}
          />
        )}
      </div>
    ))}

    <div className="grid grid-cols-3 gap-2 absolute left-[calc(100%+50px)] w-full">
      {pieces.map((piece) => (
        <img
          key={piece.id}
          src={piece.piece}
          alt="puzzle piece"
          className="w-24 h-24 cursor-pointer"
          draggable
          onDragStart={handleDragStart(piece, null)}
        />
      ))}
    </div>
  </div>

  <button
    disabled={!disabled}
    onClick={checkAnswer}
    className="px-5 py-2 rounded-lg mt-7 block mx-auto font-semibold shadow-md transition-all 
           bg-green-500 text-white hover:bg-green-600 active:scale-95 
           disabled:bg-red-300 disabled:text-red-700 disabled:cursor-not-allowed"
  >
    Kiểm tra
  </button>
</motion.div>
  );
}

export default PuzzleGame;
