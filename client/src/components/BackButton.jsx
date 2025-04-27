import { useNavigate } from "react-router-dom";

export default function BackButton({home}) {
  const navigate = useNavigate();
  let handleClick=()=>{
    if (home) navigate("/home")
    else navigate(-1)
  }
  return (
    <button
      onClick={handleClick}
      className="absolute z-5 top-4 left-4 flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full shadow"
    >
       {home ? "← Về trang chủ"  : "← Quay lại"}
    </button>
  );
}
