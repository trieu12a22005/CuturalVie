import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
function Trip() {
  const {region,game: gamedata}=useSelector(state=>state.region)
  //let dispatch=useDispatch()
  const images = [
    { src: "trip/history.png", alt: "History" },
    { src: "trip/cultural_1.png", alt: "Cultural 1" },
    { src: "trip/cultural_2.png", alt: "Cultural 2" },
  ];
  const location = useLocation();
  const { regionData } = location.state || {};
  const game = regionData.game;
  console.log(game);
  const navigate = useNavigate();
  console.log(game);
  function handleImageClick(index) {
    
    navigate("/trip/instruction", {
      state: {
        image: `/trip/trip${index + 1}.png`,
      },
    });
  }
  console.log(region,gamedata);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.5 }}
        className="relative w-[95%] h-[95%] mx-auto"
      >
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
          <p>Đồng bằng Bắc Bộ</p>
        </motion.div>
      </motion.div>
    </>
  );
}
export default Trip;
