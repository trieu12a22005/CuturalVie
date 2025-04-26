import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const isYoutubeUrl = (url) =>
  typeof url === "string" &&
  (url.includes("youtube.com") || url.includes("youtu.be"));

  const getYoutubeEmbedUrl = (url) => {
    try {
      const videoId = url.includes("youtu.be")
        ? url.split("/").pop().split("?")[0]
        : new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`;
    } catch {
      return "";
    }
  };
  

export default function ImageSlider({ image }) {
  return (
    <div className="relative w-[400px] p-6 ml-20">
      <Swiper
  modules={[Navigation]}
  navigation={{
    nextEl: ".next",
    prevEl: ".prev",
  }}
  loop={true}
>
  {image?.map((item, index) => {
    const alt = item.alt || "";
    const youtube = item.youtubeLink;
    const images = item.images || [];

    const hasMedia = isYoutubeUrl(youtube) || images.length > 0;

    return (
      <SwiperSlide key={index}>
        <div className="text-center">
          {isYoutubeUrl(youtube) ? (
            <div className="w-full aspect-video">
              <iframe
                src={getYoutubeEmbedUrl(youtube)}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-xl"
              ></iframe>
            </div>
          ) : images.length > 0 ? (
            <img
              src={images[0].imageUrl}
              alt={alt}
              className="w-full h-[250px] object-contain rounded-xl"
            />
          ) : null}

          {/* Only show alt text if it exists */}
          {alt && (
            <p className="mt-2 text-sm font-semibold text-gray-700">{alt}</p>
          )}
        </div>
      </SwiperSlide>
    );
  })}
</Swiper>


      <div className="flex gap-12 mt-5 justify-center">
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
