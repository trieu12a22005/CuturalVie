import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function InstructionTrip() {
  const location = useLocation();
  const index = location.state?.index;
  const image = `/trip/trip${index + 1}.png`;
  const { region, game: game } = useSelector((state) => state.region);
  console.log(region)
  console.log(game)
  const navigate = useNavigate();
  const paths = {
    1: "/quizz/rule",
    2: "/game2/rule",
    3: "/game3/rule",
    4: "/word/rule",
  };
  const handleClick = () => {
    const path = paths[game[index]];
    if (path) {
      navigate(path);
    } else {
      console.log(game[index])
      console.warn("Không tìm thấy game phù hợp");
    }
  };

  return (
    <>
      <div className="relative w-[80%] h-[80%] mx-auto">
        <img
          src={image}
          className="absolute w-full h-full object-contain z-0 mt-2"
          alt="Rule Background"
        />
      </div>
      <div>
        <button
          className="mt-[20px] flex ml-[44%] bg-[#009951] p-[15px] pl-[40px] pr-[40px] rounded-2xl text-[20px] text-white font-bold"
          onClick={handleClick}
        >
          Start now
        </button>
      </div>
    </>
  );
}
export default InstructionTrip;
