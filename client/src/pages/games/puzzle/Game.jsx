import { useEffect, useState } from "react";
import QuizHeader from "../../../components/Game/headerGame";
import PuzzleGame from "../../../components/puzzleGame/question";
import { useDispatch, useSelector } from "react-redux";
import { getPuzzle } from "../../../store/puzzle";
import Loader from "../../../components/loading";
import Solution from "../../../components/puzzleGame/Solution";
import { motion } from "framer-motion";
import axiosInstance from "../../../api/axios";


export default function PuzzleQuiz() {
  const { progress, current, modal } = useSelector((state) => state.puzzle);
  const { region} = useSelector((state) => state.region);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/game/get-gamedata',{
          params: {
             gameType: 'puzzle',
             regionId: region
          }
        })
        console.log(response.data);
        dispatch(getPuzzle(response.data));
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) return <Loader />;
  return (
    <>
      <QuizHeader progress={progress} count={current} />
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
