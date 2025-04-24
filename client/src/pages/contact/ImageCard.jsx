import { useNavigate } from "react-router-dom";

const ImageCard = ({ image, name }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/detail/${encodeURIComponent(name)}`, { state: { subject: name } });
  };

  return (
    <div className="relative rounded-lg overflow-hidden group">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover transition duration-300 group-hover:brightness-50"
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <div className="relative gap-4 flex flex-col items-center justify-center text-center p-4">
          <h2 className="text-white text-2xl font-bold">{name}</h2>
          <button
            onClick={handleReadMore}
            className="bg-white text-green-600 rounded-full border-green-600 border-2 px-4 py-2 font-semibold transition duration-300 hover:bg-green-600 hover:text-white"
          >
            Đọc thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;