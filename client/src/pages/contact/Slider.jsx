import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';

const ImageSlider = ({items}) => {
    const navigate = useNavigate()
    const handleReadMore = (itemName) => {
        navigate(`/detail/${encodeURIComponent(itemName)}`, { state: { subject: itemName } });
    }
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={10}
        slidesPerView={4}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        speed={1000}
        pagination={{ clickable: true }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className='relative rounded-lg overflow-hidden group'>
                <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-48 object-cover transition duration-300 group-hover:brightness-50"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <div className="relative gap-4 flex flex-col items-center justify-center text-center p-4">
                    <h2 className="text-white text-2xl font-bold">{item.name}</h2>
                    <button
                        onClick={() => handleReadMore(item.name)}
                        className="bg-white text-green-600 rounded-full border-green-600 border-2 px-4 py-2 font-semibold transition duration-300 hover:bg-green-600 hover:text-white"
                    >
                        Đọc thêm
                    </button>
                    </div>
                </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
