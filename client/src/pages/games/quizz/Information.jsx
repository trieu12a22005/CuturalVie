import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./styles.css";
import { Navigation } from "swiper/modules";
import img1 from "/public/information_1/image1.png";
import img2 from "/public/information_1/image2.png";
import img3 from "/public/information_1/image3.png";

function Infomation() {
  const images = [img1, img2, img3];

  return (
    <>
      <div className="relative w-[80vw] mx-auto mt-[60px] h-[800px]">
  <img src="/frame/Frame 2-1.png" alt="Khung hình" className="w-full h-full" />

  {/* Chữ nằm trên ảnh */}
  <p className="absolute top-[40px] left-1/2 -translate-x-1/2 font-bold text-[16px] text-center">
    Vượt đỉnh tri thức
  </p>
  
  <div className="relative">
  <Swiper navigation={true} modules={[Navigation]} className="mySwiper z-[90] absolute bottom-[20vh] left-[17vw]">
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
  </div>
</div>

    </>
  );
}

export default Infomation;
