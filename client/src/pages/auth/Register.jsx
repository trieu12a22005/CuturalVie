import { useState } from "react";
import toast from "react-hot-toast";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import axiosInstance from "../../api/axios";
import { notifyError } from "../../utils/notify";
import { useNavigate } from "react-router-dom";

export default function Register({ onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const validateAllFields = () => {
    const tempErrors = {};
    Object.keys(formData).forEach((field) => {
      const value = formData[field];
      if (!value || !value.trim()) {
        tempErrors[field] = "Trường này không được để trống";
      } else if (field === "name" && value.length < 3) {
        tempErrors[field] = "Tên phải có ít nhất 3 ký tự";
      } else if (
        field === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        tempErrors[field] = "Email không hợp lệ";
      } else if (field === "password" && value.length < 6) {
        tempErrors[field] = "Mật khẩu phải có ít nhất 6 ký tự";
      }
    });

    setErrors(tempErrors);
    return tempErrors;
  };

  const validateField = (name, value) => {
    let error = "";
    if (!value || !value.trim()) {
      error = "Trường này không được để trống";
    } else if (name === "name" && value.length < 3) {
      error = "Tên phải có ít nhất 3 ký tự";
    } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Email không hợp lệ";
    } else if (name === "password" && value.length < 6) {
      error = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      validateField(name, value);
    }
  };

  const fetchApi = async () => {
    try {
      const res = await axiosInstance.post(
        "https://viet-cultural-be.vercel.app/api/v1/auth/send-verification-email",
        { email: formData.email }
      );
    } catch (err) {
      console.error("Lỗi gửi OTP:", err.response?.data || err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateAllFields();
    if (Object.values(validationErrors).some((e) => e)) return;

    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          email: formData.email,
          full_name: formData.name,
          password: formData.password,
        }
      );

      if (response) {
        toast.success("Đăng kí thành công!");
        await fetchApi();
        navigate("/verify-otp")
      }
    } catch (err) {
      console.error("❌ Lỗi:", err.response?.data || err.message);
      notifyError("Đăng kí thất bại!");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
      {/* Nút đóng */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-[#14AE5C] hover:bg-red-500 px-2 py-1 rounded-md"
      >
        <AiOutlineClose size={21} />
      </button>

      <h2 className="text-xl font-semibold text-center mb-4">
        Đăng kí tài khoản
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Tên */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Tên người chơi
          </label>
          <div className="relative">
            <FiUser
              className="absolute left-3 top-3 text-[#14AE5C]"
              size={20}
            />
            <input
              type="text"
              name="name"
              className="w-full pl-10 p-2 rounded-md bg-green-100 focus:ring-2 focus:ring-green-500 outline-0"
              placeholder="Nhập tên của bạn"
              value={formData.name}
              onChange={handleChange}
              onBlur={() => validateField("name", formData.name)}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
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
              className="w-full pl-10 p-2 rounded-md bg-green-100 focus:ring-2 focus:ring-green-500 outline-0"
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

        {/* Mật khẩu */}
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
              className="w-full pl-10 pr-10 p-2 rounded-md bg-green-100 focus:ring-2 focus:ring-green-500 outline-0"
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={handleChange}
              onBlur={() => validateField("password", formData.password)}
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
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Nút đăng ký */}
        <button
          type="submit"
          className="w-full bg-[#14AE5C] text-white p-2 rounded-md hover:bg-green-600"
        >
          Đăng kí
        </button>

        {/* Chuyển sang đăng nhập */}
        <p className="text-sm text-center mt-4">
          Bạn đã có tài khoản?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-[#14AE5C] hover:underline"
          >
            Đăng nhập ngay
          </button>
        </p>
      </form>
    </div>
  );
}
