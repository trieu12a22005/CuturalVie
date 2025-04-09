import { useState } from "react";
import toast from "react-hot-toast";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { notifyError } from "../../utils/notify";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const validateField = (name, value) => {
    let error = "";

    if (!value.trim()) {
      error = "Trường này không được để trống";
    } else if (name === "name" && value.length < 3) {
      error = "Tên phải có ít nhất 3 ký tự";
    } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Email không hợp lệ";
    } else if (name === "password" && value.length < 6) {
      error = "Mật khẩu phải có ít nhất 6 ký tự";
    } else if (name === "otp" && otpSent && value.length !== 6) {
      error = "OTP phải có 6 chữ số";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return {
      ...errors,
      [name]: error,
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      validateField(name, value);
    }

  };

  const handleGetOtp =async  () => {
    const emailError = validateField("email", formData.email);
    if (emailError.email) {
      if (formData.email == "") toast.error("Vui lòng nhập email");
      else toast.error(emailError.email);
      return;
    }
    setOtpSent(true)
    try {
      let {data}= await axiosInstance.post("/auth/send-verification-email",{email: formData.email})
      console.log(data);
   } catch (error) {
     console.log(error);
      notifyError(error.response.data.message)
   }
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    Object.keys(formData).forEach((field) => {
      newErrors = validateField(field, formData[field]);
    });
    console.log(newErrors);
    if (Object.values(newErrors).some((error) => error)) return;
    console.log(formData);
  //   try {
  //     let {data}= await axiosInstance.post("/auth/register",formData)
  //     console.log(data);
  //  } catch (error) {
  //    console.log(error);
  //     notifyError(error.response.data.message)
  //  }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
      {/* Close Button */}
      <button className="absolute top-4 right-4 text-gray-600 hover:text-red-500 bg-[#14AE5C] px-2 py-1 rounded-md">
        <AiOutlineClose size={21} className="text-white" />
      </button>

      {/* Title */}
      <h2 className="text-xl font-semibold text-center mb-4">
        Đăng kí tài khoản
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Name Input */}
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
              className="w-full pl-10 p-2 rounded-md focus:ring-2 focus:ring-green-500 outline-0 bg-green-100"
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
              className="w-full pl-10 p-2 rounded-md focus:ring-2 focus:ring-green-500 outline-0 bg-green-100"
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

        {/* OTP Input & Get OTP Button */}
        <div className="mb-4 flex">
          <div className="relative w-2/3">
            <FiMail
              className="absolute left-3 top-3 text-[#14AE5C]"
              size={20}
            />
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
        {errors.otp && (
          <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
        )}

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-[#14AE5C] text-white p-2 rounded-md hover:bg-green-600"
        >
          Đăng kí
        </button>
        <p className="text-sm text-center mt-4">
          Bạn đã có tài khoản?{" "}
          <Link to="/login" className="text-[#14AE5C] hover:underline">
            Đăng nhập ngay
          </Link>
        </p>
      </form>
    </div>
  );
}
