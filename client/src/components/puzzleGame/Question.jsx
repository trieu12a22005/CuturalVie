import React, { useState } from "react";

const puzzleData = {
  hint: "Đây là một đồ vật đại diện cho nền văn minh sông Hồng",
  image: "path/to/image.png",
  options: [
    { id: 1, piece: "/drum/drum1.png" },
    { id: 2, piece: "/drum/drum2.png" },
    { id: 3, piece: "/drum/drum3.png" },
    { id: 4, piece: "/drum/drum4.png" },
    { id: 5, piece: "/drum/drum5.png" },
    { id: 6, piece: "/drum/drum6.png" },
    { id: 7, piece: "/drum/drum7.png" },
    { id: 8, piece: "/drum/drum8.png" },
    { id: 9, piece: "/drum/drum9.png" },
  ],
  answer: [6,2,9,4,7,3,1,5,8],
};

function PuzzleGame() {
  const [slots, setSlots] = useState(Array(9).fill(null));
  const [pieces, setPieces] = useState([...puzzleData.options]);
  const [message, setMessage] = useState("");

  const handleDragStart = (piece, index) => (event) => {
    event.dataTransfer.setData("pieceId", piece.id);
    event.dataTransfer.setData("sourceIndex", index);
  };

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
    const isCorrect = slots.every((piece, i) => piece?.id === puzzleData.answer[i]);
    setMessage(isCorrect ? "Chính xác!" : "Sai, hãy thử lại!");
  };

  return (
    <div className="flex gap-6 justify-center mt-10 items-center">
      <div className="grid grid-cols-3 gap-2 bg-gray-800 p-4 rounded-lg">
        {slots.map((slot, index) => (
          <div
            key={index}
            className="w-20 h-20 bg-gray-600 flex items-center justify-center border border-gray-400"
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
      </div>
      <div className="grid grid-cols-3 gap-2">
        {pieces.map((piece) => (
          <img
            key={piece.id}
            src={piece.piece}
            alt="puzzle piece"
            className="w-20 h-20 cursor-pointer"
            draggable
            onDragStart={handleDragStart(piece, null)}
          />
        ))}
      </div>
      <button
        onClick={checkAnswer}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4"
      >
        Kiểm tra
      </button>
      {message && <p className="text-lg font-bold mt-2 text-red-500">{message}</p>}
    </div>
  );
}

export default PuzzleGame;
