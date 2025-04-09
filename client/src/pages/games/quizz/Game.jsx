import { useState, useEffect } from "react";
import QuizHeader from "../../../components/Game/headerGame";
import Question from "../../../components/quizzGame/Question";
import QuizAnswer from "../../../components/quizzGame/QuizAnswer";
import Loader from "../../../components/loading";
import { questions } from "../../../utils/quizz";
import { useDispatch, useSelector} from "react-redux";
import { getQuizz } from "../../../store/quizz";


const QuizGame = () => {
  const {progress,current} =  useSelector(state=>state.quizz);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
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
    <QuizHeader progress={progress} current={current}/>
    <Question/>
    <QuizAnswer/>
  </>
};

export default QuizGame;