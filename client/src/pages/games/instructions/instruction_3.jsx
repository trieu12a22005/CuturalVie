import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../../components/BackButton";
function Instruction_3() {
  const {region}=useSelector(state=>state.region)
  const Image = `/bgRegion/image${region}.png`;
  const location = useLocation();
  const description = location.state.description;
  console.log(description)
  const navigate = useNavigate();
  const text1 = description.text1;
  const subject = description.subject;
  const text2 = description.text2;
  const handleClick = () => {
    const nameRegion = description.subject;
    localStorage.setItem("nameRegion", nameRegion);
    navigate("/trip");
  };
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.5 }}
        className="relative w-[90%] h-[90%] mx-auto"
      >
        <img
          src="/bg/bg5.png"
          className="absolute w-full h-full object-cover z-0 mt-2"
          alt="Rule Background"
        />
        <div className="absolute top-[10%] left-[25%] w-[50%] font-bold">
          <p className="text-center text-xl">{text1}</p>
          <p className="text-center mt-[10px] text-2xl">{subject}</p>
        </div>
        <div className="flex">
          <img
            src= {Image}
            className="absolute w-[25%] rounded-2xl h-auto object-cotain z-0 top-[30%] left-[22%]"
          />
          <p className=" absolute z-20 w-[29%] top-[30%] left-[48%] font-semibold">
            {text2}
          </p>
        </div>
        <button
          className="z-20 absolute top-[75%] left-1/2 transform -translate-x-1/2 mt-[20px] px-[40px] py-[15px]
             bg-[#6B8E23] hover:bg-[#5c7a1f] text-white text-[20px] font-bold rounded-2xl 
             shadow-md transition duration-300 ease-in-out"
             onClick={handleClick}
        >
          Start
        </button>
      </motion.div>
      <BackButton/>
    </>
  );
}
export default Instruction_3;
