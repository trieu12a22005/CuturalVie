import { useState } from "react";
import toast from "react-hot-toast";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FiMail, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const validateField = (name, value) => {
    let error = "";

    if (!value.trim()) {
      error = "Trường này không được để trống";
    } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Email không hợp lệ";
    } else if (name === "otp" && otpSent && value.length !== 6) {
      error = "OTP phải có 6 chữ số";
    } else if (name === "newPassword" && value.length < 6) {
      error = "Mật khẩu phải có ít nhất 6 ký tự";
    } else if (name === "confirmPassword" && value !== formData.newPassword) {
      error = "Mật khẩu không khớp";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return { ...errors, [name]: error };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      validateField(name, value);
    }
  };

  const handleGetOtp = () => {
    const emailError = validateField("email", formData.email);
    if (emailError.email) {
      toast.error(emailError.email || "Vui lòng nhập email hợp lệ");
      return;
    }
    setOtpSent(true);
    toast.success("OTP đã được gửi!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    Object.keys(formData).forEach((field) => {
      newErrors = validateField(field, formData[field]);
    });

    if (Object.values(newErrors).some((error) => error)) return;
    toast.success("Mật khẩu đã được thay đổi thành công!");
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
      {/* Close Button */}
      <button className="absolute top-4 right-4 text-gray-600 hover:text-red-500 bg-[#14AE5C] px-2 py-1 rounded-md">
        <AiOutlineClose size={21} className="text-white" />
      </button>

      {/* Title */}
      <h2 className="text-xl font-semibold text-center mb-4">
        Tạo mật khẩu mới
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <div className="mb-4">
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-[#14AE5C]" size={20} />
            <input
              type="email"
              name="email"
              className="w-full pl-10 p-2 rounded-md focus:ring-2 focus:ring-green-500 outline-0 bg-green-100"
              placeholder="Gmail"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => validateField("email", formData.email)}
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* OTP Input & Get OTP Button */}
        <div className="mb-4 flex">
          <div className="relative w-2/3">
            <FiMail className="absolute left-3 top-3 text-[#14AE5C]" size={20} />
            <input
              type="text"
              name="otp"
              className="w-full pl-10 p-2 rounded-md focus:ring-2 focus:ring-green-500 outline-0 bg-green-100"
              placeholder="Nhập OTP"
              value={formData.otp}
              onChange={handleChange}
              disabled={!otpSent}
            />
          </div>
          <button
            type="button"
            onClick={handleGetOtp}
            className="ml-2 px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 whitespace-nowrap"
          >
            {otpSent ? "Resend OTP" : "Get OTP"}
          </button>
        </div>
        {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp}</p>}

        {/* New Password Input */}
        <div className="mb-4">
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-[#14AE5C]" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              className="w-full pl-10 p-2 rounded-md focus:ring-2 focus:ring-green-500 outline-0 bg-green-100"
              placeholder="Mật khẩu mới"
              value={formData.newPassword}
              onChange={handleChange}
              onBlur={() => validateField("newPassword", formData.newPassword)}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-green-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="mb-4">
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-[#14AE5C]" size={20} />
            <input
              type="password"
              name="confirmPassword"
              className="w-full pl-10 p-2 rounded-md focus:ring-2 focus:ring-green-500 outline-0 bg-green-100"
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={() => validateField("confirmPassword", formData.confirmPassword)}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#14AE5C] text-white p-2 rounded-md hover:bg-green-600"
        >
          Xác nhận
        </button>
        <p className="text-sm text-center mt-4">
          Bạn đã có tài khoản?{" "}
          <Link to="/" className="text-[#14AE5C] hover:underline">
            Đăng nhập ngay
          </Link>
        </p>
      </form>
    </div>
  );
}
