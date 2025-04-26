import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMail } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import axiosInstance from "../../api/axios";
import toast from "react-hot-toast";
import { notifyError } from "../../utils/notify";

export default function VerifyOTP() {
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const email = location.state?.email;
  const handleVerify = async () => {
    console.log(otp)
    if (!otp.trim()) {
      notifyError("Vui lòng nhập mã OTP");
      return;
    }

    try {
        const res = await axiosInstance.get(
            "https://viet-cultural-be.vercel.app/api/v1/auth/verify-email",
            {
              params: {
                otp: otp
              }
            }
          )
      if (res) {
        toast.success("Xác minh thành công!");
        navigate("/");
      } else {
        notifyError("Mã OTP không chính xác hoặc đã hết hạn");
      }
    } catch (err) {
      notifyError("Lỗi xác minh OTP!");
    }
  };

  return (
    <div className="bg-white p-8 rounded-md shadow-lg relative w-[400px] max-w-[90%] text-center">
      {/* Close Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 right-4 bg-[#14AE5C] p-1 rounded"
      >
        <AiOutlineClose size={20} color="#fff" />
      </button>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-3">Mã OTP</h2>
      <p className="text-gray-700 mb-6">
        Đã gửi OTP qua email, vui lòng kiểm tra hòm thư của bạn để lấy mã!
      </p>

      {/* OTP Input */}
      <div className="relative mb-4">
        <FiMail className="absolute left-3 top-3 text-[#14AE5C]" size={20} />
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Nhập OTP"
          className="w-full pl-10 p-2 bg-green-100 rounded-md outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleVerify}
        className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-md"
      >
        Xác nhận
      </button>
    </div>
  );
}
