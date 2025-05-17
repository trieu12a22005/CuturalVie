import {useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {useDispatch, useSelector } from "react-redux";
import Backbutton from '../../../components/BackButton'
import axiosInstance from '../../../api/axios'
import { setText } from "../../../store/Region";
function Trip() {
  const {region,currentGame}=useSelector(state=>state.region)
  //let dispatch=useDispatch()
  const images = [
    { src: "trip/history.png", alt: "History" },
    { src: "trip/cultural_1.png", alt: "Cultural 1" },
    { src: "trip/cultural_2.png", alt: "Cultural 2" },
  ];
  let dispatch=useDispatch()
  const name = localStorage.getItem("nameRegion");
  const navigate = useNavigate();
  async function handleImageClick(index) {
    let text="";
    console.log(index);
    if (index==0)
    {

      localStorage.setItem("trip", "history");
      text="lịch sử của "+name;
    }
    else if (index==2)
    {
      localStorage.setItem("trip","intangible_heritage")
      text="Di sản văn hóa vật thể của "+name;
    }
    else if (index==1)
    {
      localStorage.setItem("trip","tangible_heritage")
      text="Di sản văn hóa phi vật thể của "+name;
    }
   text=text.toLocaleLowerCase();
   text=text[0].toLocaleUpperCase()+text.slice(1);
   console.log(text);
   dispatch(setText(text))
   await axiosInstance.post("/history",{
        description: text,
        gameTypeId: index,
        regionId: region,
        completed: false
    })
    navigate("/trip/instruction", {
      state: {
        index: index
      },
    });
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.5 }}
        className="relative w-[95%] h-[95%] mx-auto"
      > 
         <Backbutton/>
        {/* Hình ảnh chiếm toàn bộ khung */}
        <motion.img
          src="bg/Frame 2.png"
          className="absolute w-full h-full object-contain mt-[2%]"
        />
        <div className="flex absolute top-[20%] left-[18%] gap-[10%] h-[30%] w-[30%]">
          {images.map((img, i) => (
            <motion.img
              key={i}
              src={img.src}
              alt={img.alt}
              className="z-20 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
              onClick={() => handleImageClick(i)}
            />
          ))}
        </div>
        {/* Chữ đè lên và nằm theo vị trí phần trăm */}
        <motion.div className="absolute top-[7%] left-[48%] translate-x-[-50%] text-[18px] font-bold text-center">
          <p>{name}</p>
        </motion.div>
       
      </motion.div>
    </>
  );
}
export default Trip;
