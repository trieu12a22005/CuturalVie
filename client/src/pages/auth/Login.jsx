import { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FiMail, FiLock } from "react-icons/fi";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { isValidEmail } from "../../utils/validate";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axios";
import { notifyError, notifySuccess } from "../../utils/notify";

export default function Login({ onClose, onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const validateField = (name, value) => {
    let errorMessage = "";

    if (!value.trim()) {
      errorMessage = "Trường này không được để trống";
    } else if (name === "email" && !isValidEmail(value)) {
      errorMessage = "Email không hợp lệ";
    } else if (name === "password" && value.length < 6) {
      errorMessage = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {
      email: formData.email.trim()
        ? isValidEmail(formData.email)
          ? ""
          : "Email không hợp lệ"
        : "Trường này không được để trống",
      password: formData.password.trim()
        ? formData.password.length >= 6
          ? ""
          : "Mật khẩu phải có ít nhất 6 ký tự"
        : "Trường này không được để trống",
    };
    setErrors(newErrors);
    if (newErrors.email || newErrors.password) return;
    try {
      let { data } = await axiosInstance.post("/auth/login", formData, {
        withCredentials: true,
      });
      notifySuccess("Đăng nhập thành công");
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("name", data.full_name);
      localStorage.setItem("avatar", data?.avatar_url)
      onClose();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log(error);
        notifyError("sai email hoặc mật khẩu");
      } else {
        notifyError("Đã xảy ra lỗi không xác định khi đăng nhập");
      }
    }
    
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 hover:text-red-500 bg-[#14AE5C] px-2 py-1 rounded-md"
      >
        <AiOutlineClose size={21} className="text-white" />
      </button>

      {/* Title */}
      <h2 className="text-xl font-semibold text-center mb-4">
        Đăng nhập tài khoản
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <div className="relative">
            <FiMail
              className="absolute left-3 top-3 text-[#14AE5C]"
              size={20}
            />
            <input
              type="email"
              name="email"
              className="w-full pl-10 p-2 rounded-md focus:ring-2 focus:ring-green-500 outline-0 bg-green-100"
              placeholder="Nhập email của bạn"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => validateField("email", formData.email)}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Input with Eye Toggle */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Mật khẩu</label>
          <div className="relative">
            <FiLock
              className="absolute left-3 top-3 text-[#14AE5C]"
              size={20}
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full pl-10 pr-10 p-2 rounded-md focus:ring-2 focus:ring-green-500 outline-0 bg-green-100"
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={handleChange}
              onBlur={() => validateField("password", formData.password)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-green-600"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex justify-between items-center text-sm mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="w-4 h-4 border-gray-300 rounded accent-emerald-500"
            />
            <span>Ghi nhớ tài khoản</span>
          </label>
          <Link
            to={"/reset-password"}
            className="text-green-500 hover:underline"
          >
            Quên mật khẩu?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-[#14AE5C] text-white p-2 rounded-md hover:bg-green-600"
        >
          Đăng nhập
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        Chưa có tài khoản?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-green-500 hover:underline"
        >
          Đăng ký ngay
        </button>
      </p>
    </div>
  );
}
