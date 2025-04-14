import { useState } from "react";
import toast from "react-hot-toast";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { notifyError } from "../../utils/notify";

export default function Register() {
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
        {
          email: formData.email,
        }
      );
      console.log("Dữ liệu từ server:", res.data);
    } catch (err) {
      console.error("Lỗi khi gửi OTP:", err.response?.data || err.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateAllFields();
    if (Object.values(validationErrors).some((e) => e)) return;

    try {
      const response = await axiosInstance.post("/auth/register", {
        email: formData.email,
        full_name: formData.name,
        password: formData.password,
      });

      toast.success("Đăng kí thành công!");
      console.log("Đăng kí thành công:", response.data);
      navigate("/verify-otp", {
        state: {
          email: formData.email,
        },
      });
      await fetchApi();
    } catch (err) {
      console.error("❌ Lỗi:", err.response?.data || err.message);
      notifyError("Đăng kí thất bại!");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
      <button className="absolute top-4 right-4 text-gray-600 hover:text-red-500 bg-[#14AE5C] px-2 py-1 rounded-md">
        <AiOutlineClose size={21} className="text-white" />
      </button>
      <h2 className="text-xl font-semibold text-center mb-4">
        Đăng kí tài khoản
      </h2>
      <form onSubmit={handleSubmit}>
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
