import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Summary() {
    const navigate = useNavigate()
    const handleClick =() =>{
        navigate("/select")
    }
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
      className="relative w-[90%] h-[90%] mx-auto"
    >
      {/* Nền ảnh */}
      <img
        src="/bg/Summary.png"
        className="absolute w-full h-full object-contain mt-[4%] z-0"
        alt="Rule Background"
      />

      {/* Bảng điểm */}
      <div className="w-full font-bold relative z-10 max-w-md mx-auto mt-[12%] border border-gray-300 rounded-lg overflow-hidden bg-white bg-opacity-90 shadow-xl">
        <table className="w-full table-fixed text-center border-collapse border border-black">
          <thead>
            <tr className="bg-purple-900 text-white">
              <th className="py-2 px-4 border border-black">Hành trình</th>
              <th className="py-2 px-4 border border-black">Ngôi sao</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="bg-purple-100">
              <td className="py-2 px-4 border border-black">Lịch sử</td>
              <td className="py-2 px-4 border border-black text-yellow-400 text-xl">
                ⭐
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border border-black">
                Di sản văn hóa vật thể
              </td>
              <td className="py-2 px-4 border border-black text-yellow-400 text-xl">
                ⭐
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border border-black">
                Di sản văn hóa phi vật thể
              </td>
              <td className="py-2 px-4 border border-black text-yellow-400 text-xl">
                ⭐
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border border-black">Tổng kết</td>
              <td className="py-2 px-4 border border-black text-yellow-400 text-xl">
                ⭐ ⭐ ⭐
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border border-black">Huy hiệu</td>
              <td className="py-2 px-4 border border-black">
                <img
                  src="/your-path/88f92e81-569d-4172-b78b-838e39837c5d.png"
                  alt="Huy hiệu"
                  className="w-10 h-10 rounded-full mx-auto border-2 border-green-500"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        className="z-10 absolute left-1/2 -translate-x-1/2 bottom-[18%]
             font-bold text-white bg-[#14AE5C]
             px-6 py-3 rounded-2xl shadow-lg 
             hover:bg-[#0e8c47] hover:scale-105 hover:shadow-xl 
             transition-all duration-300"
             onClick={handleClick}
      >
        Vùng miền mới
      </button>
    </motion.div>
  );
}

export default Summary;
