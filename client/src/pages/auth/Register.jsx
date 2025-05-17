import { useState, useEffect } from "react";
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
import { fetchCountries } from "../../utils/uploadthing";

export default function Register({ onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age_range: "student",
    nationality: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCountries().then(setCountries);
  }, []);

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
      await axiosInstance.post(
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
    console.log(formData);
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          email: formData.email,
          full_name: formData.name,
          password: formData.password,
          age_range: formData.age_range,
          nationality: formData.nationality,
        }
      );
  console.log(response);
      if (response) {
        toast.success("Đăng kí thành công!");
        await fetchApi();
        navigate("/verify-otp");
      }
    } catch (err) {
      console.error("❌ Lỗi:", err.response?.data || err.message);
      notifyError("Đăng kí thất bại!");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-[#14AE5C] hover:bg-red-500 px-2 py-1 rounded-md"
      >
        <AiOutlineClose size={21} />
      </button>

      <h2 className="text-xl font-semibold text-center mb-4">Đăng kí tài khoản</h2>

      <form onSubmit={handleSubmit}>
        {/* Tên */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tên người chơi</label>
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-[#14AE5C]" size={20} />
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
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Age range */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Độ tuổi</label>
          <div className="flex gap-4 bg-green-100 rounded-md p-2">
            <label className="flex-1 cursor-pointer hover:bg-green-300 rounded-md transition-colors">
              <input
                type="radio"
                name="age_range"
                value="student"
                className="peer hidden"
                checked={formData.age_range === "student"}
                onChange={handleChange}
              />
              <div className="w-full text-center py-2 rounded-md peer-checked:bg-green-500 peer-checked:text-white transition-colors">
                10 đến 25
              </div>
            </label>

            <label className="flex-1 cursor-pointer hover:bg-green-300 rounded-md transition-colors">
              <input
                type="radio"
                name="age_range"
                value="non_student"
                className="peer hidden"
                checked={formData.age_range === "non_student"}
                onChange={handleChange}
              />
              <div className="w-full text-center py-2 rounded-md peer-checked:bg-green-500 peer-checked:text-white transition-colors">
                Trên 25
              </div>
            </label>
          </div>
        </div>

        {/* Country select */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Quốc gia</label>
          <select
            name="nationality"
            value={formData.country}
            onChange={handleChange}
            onBlur={() => validateField("nationality", formData.country)}
            className="w-full p-2 rounded-md bg-green-100 focus:ring-2 focus:ring-green-500 outline-0"
          >
            <option value="">Chọn quốc gia</option>
            {countries.map((country) => (
              <option key={country.cca3} value={country.name.common}>
                {country.name.common}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">{errors.country}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-[#14AE5C]" size={20} />
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
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Mật khẩu */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Mật khẩu</label>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-[#14AE5C]" size={20} />
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
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-[#14AE5C] text-white p-2 rounded-md hover:bg-green-600"
        >
          Đăng kí
        </button>

        {/* Switch to login */}
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
