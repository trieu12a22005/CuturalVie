import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = ["/vanmieu.png", "/vanmieu2.png", "/vanmieu3.png"];

export default function ImageSlider() {
  return (
    <div className="relative w-[400px] p-6 ml-20 ">
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".next",
          prevEl: ".prev",
        }}
        loop={true}
        
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} >
            <img
              src={src}
              alt={`Slide ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className=" flex gap-12 mt-5 justify-center">
        <button className="prev flex items-center justify-center w-10 h-10 border-2 border-black text-black rounded-full bg-transparent hover:bg-black hover:text-white transition">
          <FaChevronLeft />
        </button>
        <button className="next flex items-center justify-center w-10 h-10 border-2 border-black text-black rounded-full bg-transparent hover:bg-black hover:text-white transition">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}