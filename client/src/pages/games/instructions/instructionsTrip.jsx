import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { notifyError } from "../../../utils/notify";
import { reset } from "../../../store/countSlice";
import { resetPuzzle } from "../../../store/puzzle";
import { resetCard } from "../../../store/Card";
import { setCurrentGame } from "../../../store/Region";
import BackButton from "../../../components/BackButton";
function InstructionTrip() {
  const location = useLocation();
  let dispatch=useDispatch()
  const index = location.state?.index;
  const image = `/trip/trip${index + 1}.png`;
  const { region, game} = useSelector((state) => state.region);
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
    dispatch(reset());
    dispatch(resetPuzzle());
    dispatch(resetCard());
    dispatch(setCurrentGame(game[index]))
    const path = paths[game[index]];
    if (path) {
      navigate(path);
    } else {
      console.log(game[index])
      notifyError("Không tìm thấy game phù hợp");
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
          Bắt đầu ngay
        </button>
        <BackButton/>
      </div>
    </>
  );
}
export default InstructionTrip;
