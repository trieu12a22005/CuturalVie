import { useLocation, useNavigate } from "react-router-dom";

function InstructionTrip() {
  const location = useLocation();
  const image = location.state?.image;
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate(`/quizz/rule`)
  }
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
        <button className="mt-[20px] flex ml-[44%] bg-[#009951] p-[15px] pl-[40px] pr-[40px] rounded-2xl text-[20px] text-white font-bold" onClick={handleClick}>
          Start now
        </button>
      </div>
    </>
  );
}
export default InstructionTrip;
