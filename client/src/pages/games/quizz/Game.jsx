import { useState } from "react";
import Question from "../../../components/quizzGame/Question";
import InteractUser from "../../../components/InteractUser";
import { useAudio } from "../../../context/AudioContext";
import QuizHeader from "../../../components/Game/headerGame";
import { useSelector } from "react-redux";
const QuizGame = () => {
  const { setIsPlaying } = useAudio();
  const {progress ,value}= useSelector((state) => state.count);
  console.log(progress,value);
  return (
    <>
          <InteractUser setIsPlaying={setIsPlaying} />
          <QuizHeader progress={progress} count={value}/>
          <Question />
    </>
  );
};

export default QuizGame;
