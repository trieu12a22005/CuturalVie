import { useState, useEffect } from "react";
import QuizHeader from "../../../components/quizzGame/headerGame";
import InteractUser from "../../../components/InteractUser";
import { useAudio } from "../../../context/AudioContext";
import Content from "../../../components/wordGame/Content";
const WordGame = () => {
  const {setIsPlaying} = useAudio()
  return <>
    <InteractUser setIsPlaying={setIsPlaying} />
    <QuizHeader/>
    <Content/>
  </>
};

export default WordGame;