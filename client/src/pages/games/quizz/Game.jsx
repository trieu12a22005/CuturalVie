import { useState, useEffect } from "react";
import Question from "../../../components/quizzGame/Question";
import InteractUser from "../../../components/InteractUser";
import { useAudio } from "../../../context/AudioContext";
import QuizHeader from "../../../components/Game/headerGame";

const QuizGame = () => {
  const {setIsPlaying} = useAudio()
  return <>
    <InteractUser setIsPlaying={setIsPlaying} />
    <QuizHeader/>
    <Question/>
  </>
};

export default QuizGame;