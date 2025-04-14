function Trip() {
  const images = [
    { src: "trip/history.png", alt: "History" },
    { src: "trip/cultural_1.png", alt: "Cultural 1" },
    { src: "trip/cultural_2.png", alt: "Cultural 2" },
  ];
  function handleImageClick(index) {
    console.log("Bạn click vào ảnh thứ", index, images[index].alt);
  }
  return (
    <>
      <div className="relative w-[95%] h-[95%] mx-auto">
        {/* Hình ảnh chiếm toàn bộ khung */}
        <img
          src="bg/Frame 2.png"
          className="absolute w-full h-full object-contain mt-[2%]"
        />
        <div className="flex absolute top-[20%] left-[18%] gap-[10%] h-[30%] w-[30%]">
          {images.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              className="z-20 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
              onClick={() => handleImageClick(i)}
            />
          ))}
        </div>
        {/* Chữ đè lên và nằm theo vị trí phần trăm */}
        <div className="absolute top-[7%] left-[48%] translate-x-[-50%] text-[18px] font-bold text-center">
          <p>Đồng bằng Bắc Bộ</p>
        </div>
      </div>
    </>
  );
}
export default Trip;
