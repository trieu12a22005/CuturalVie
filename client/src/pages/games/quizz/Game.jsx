import { useState, useEffect } from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import QuizHeader from "../../../components/quizzGame/headerGame";
import Question from "../../../components/quizzGame/Question";
import QuizAnswer from "../../../components/quizzGame/QuizAnswer";
import Loader from "../../../components/loading";
import { questions } from "../../../utils/quizz";
import { useDispatch, useSelector} from "react-redux";
import { getQuizz } from "../../../store/quizz";
import InteractUser from "../../../components/InteractUser";
import { useAudio } from "../../../context/AudioContext";

const QuizGame = () => {
  const {setIsPlaying} = useAudio()
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  <InteractUser setIsPlaying={setIsPlaying} />
  useEffect(() => {
    const fetchFakeData = async () => {
      try {
        const fakeData = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(questions);
          }, 1000); 
        });

       dispatch(getQuizz(fakeData));
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchFakeData();
  }, []);
  if (loading) return <Loader/>;
  
  return <>
    <QuizHeader/>
    <Question/>
    <QuizAnswer/>
  </>
};

export default QuizGame;