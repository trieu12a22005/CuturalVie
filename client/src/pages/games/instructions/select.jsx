import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getClassname, images, text } from "../../../utils/select";
import {  motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAudio } from "../../../context/AudioContext";
import InteractUser from "../../../components/InteractUser";
import axiosInstance from "../../../api/axios";
import { useDispatch } from "react-redux";
import { setGame, setRegion } from "../../../store/Region";
import { reset } from "../../../store/countSlice";
import { resetPuzzle } from "../../../store/puzzle";
import { resetCard } from "../../../store/Card";
import BackButton from "../../../components/BackButton";
const textVariants = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: { delay: 0.5+i*0.1 },
  }),
};
function Select() {
   const { setIsPlaying } = useAudio();
   let dispatch=useDispatch()
  const navigate = useNavigate();
  const handleClickImg = async (index) =>{
    console.log(index);
    if (index<3)
    {
      index = index+1;
    }
    else if (index==3 || index==4)
    {
      index = 4;
    }
    else if (index==5)
    {
      index= 7;
    }
    const res = await fetch(`https://viet-cultural-be.vercel.app/api/v1/region/get-region?id=${index}`)
    if (res)
    {
      dispatch(setRegion(index))
      dispatch(reset());
      dispatch(resetPuzzle());
      dispatch(resetCard())
      const result = await res.json();
      const parsedDescription = JSON.parse(result.description);
      console.log(parsedDescription)
      console.log(parsedDescription);
      dispatch(setGame(result.game))
      navigate("/instructions_3",{
        state: {
        description: parsedDescription
      },
      });
    }
  }

  useEffect(()=>{
     axiosInstance.get("/users/profile").then(res=>{
        console.log(res.data);
     }).catch(err=>console.log(err))
  },[])
  return (
    <Layout>
    <BackButton home={true}/>
    <InteractUser setIsPlaying={setIsPlaying} />
      {images.map((src, index) => (
        <img
          className={
            getClassname(src) +
            " absolute transition-transform duration-300 hover:scale-110"
          }
          key={index}
          src={src}
          onClick={() => handleClickImg(index)}
        />
      ))}

      <div className="relative w-fit top-[90px] left-7">
        <img src="/items/chat.png" alt="Hanging Board" />
        
        <p className=" absolute top-12 left-10 font-semibold text-lg w-[75%]">
          {text.split(" ").map((word, index) => (
            <motion.span
              key={index}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              {word} {" "}
            </motion.span>
          ))}
        </p>
      </div>
      <motion.img
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-[-35px] left-[-60px]"
        src="/character/character2.png"
        alt="Character"
      />

      <motion.img
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute left-[300px] top-[320px]"
        src="/items/hat.png"
        alt="Bird"
      />

    </Layout>
  );
}

export default Select;
