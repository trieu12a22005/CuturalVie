import { useState, useEffect } from "react";

import InteractUser from "../../../components/InteractUser";
import { useAudio } from "../../../context/AudioContext";
import Content from "../../../components/wordGame/Content";
import QuizHeader from "../../../components/Game/headerGame";
const WordGame = () => {
  const {setIsPlaying} = useAudio()
  return <>
    <InteractUser setIsPlaying={setIsPlaying} />
    <QuizHeader/>
    <Content/>
  </>
};

export default WordGame;