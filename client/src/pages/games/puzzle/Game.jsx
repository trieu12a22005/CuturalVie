import { useEffect, useState } from "react";
import QuizHeader from "../../../components/Game/headerGame";
import PuzzleGame from "../../../components/puzzleGame/question";
import { useDispatch, useSelector } from "react-redux";
import { getPuzzle } from "../../../store/puzzle";
import Loader from "../../../components/loading";
import Solution from "../../../components/puzzleGame/Solution";
import { motion } from "framer-motion";
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
  answer: [6, 2, 9, 4, 7, 3, 1, 5, 8],
};
export default function PuzzleQuiz() {
  const { progress, current, modal } = useSelector((state) => state.puzzle);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  console.log(progress);
  useEffect(() => {
    const fetchFakeData = async () => {
      try {
        const fakeData = await new Promise((resolve) => {
          setTimeout(() => {
            resolve([puzzleData]);
          }, 1000);
        });

        dispatch(getPuzzle(fakeData));
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchFakeData();
  }, []);
  if (loading) return <Loader />;
  return (
    <>
      <QuizHeader progress={progress} current={current} />
      {modal ? <Solution /> : <PuzzleGame />}

      {!modal && <motion.img
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bottom-2 fixed left-2"
        src="/template/group3.png"
        alt=""
      />}
    </>
  );
}
