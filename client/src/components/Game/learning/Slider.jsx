import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = ["/vanmieu/vanmieu.png", "/vanmieu/vanmieu2.png", "/vanmieu/vanmieu3.png"];

export default function ImageSlider({image}) {
  console.log(image)
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
        {image?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="text-center">
              <img
                src={item.images[0]?.imageUrl}
                alt={item.alt}
                className="w-full h-[250px] object-contain rounded-xl"
              />
              <p className="mt-2 text-sm font-semibold text-gray-700">
                {item.alt}
              </p>
            </div>
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