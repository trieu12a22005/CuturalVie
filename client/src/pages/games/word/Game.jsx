import { useState, useEffect } from "react";
import InteractUser from "../../../components/InteractUser";
import { useAudio } from "../../../context/AudioContext";
import Content from "../../../components/wordGame/Content";
import QuizHeader from "../../../components/Game/headerGame";
import { useSelector } from "react-redux";
const WordGame = () => {
  const {setIsPlaying} = useAudio()
  let {progress,value}=useSelector(state=>state.count)
  return <>
    <InteractUser setIsPlaying={setIsPlaying} />
    <QuizHeader progress={progress} count={value}/>
    <Content/>
  </>
};

export default WordGame;