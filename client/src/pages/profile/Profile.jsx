import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { storage } from "../../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Header from "../../components/Header/Header";
import Footer from "../home/Footer";
import { fetchCountries } from "../../utils/uploadthing";

const UserProfile = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    gender: "",
    dob: "",
    nationality: "",
    age_range: ""
  });

  const [avatar, setAvatar] = useState();
  const [countryList, setCountryList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);
        updateState(data);
      } catch (err) {
        console.error("Lỗi khi fetch profile:", err);
      }
    }

    function updateState(data) {
      setFormData((prev) => ({
        ...prev,
        username: data.full_name || "",
        email: data.email || "",
        gender: data.gender || "",
        dob: data.date_of_birth?.split("T")[0] || "",
        nationality: data.nationality || "",
        age_range: data.age_range || ""
      }));
      setAvatar(data.avatar_url || "https://cdn-icons-png.flaticon.com/512/4140/4140037.png");
    }

    fetchData();
    fetchCountries().then(res => {
      setCountryList(res);
    });
  }, []);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const userId = formData.email || "user";
        const filePath = `avatars/${userId}_${Date.now()}_${file.name}`;
        const storageRef = ref(storage, filePath);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setFormData((prev) => ({ ...prev, avatar: downloadURL }));
        setAvatar(downloadURL);
        toast.success("Tải ảnh đại diện thành công!");
      } catch (err) {
        toast.error("Tải ảnh đại diện thất bại!");
        console.error(err);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async () => {
    console.log(formData);
    const isoDate = new Date(formData.dob).toISOString();
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/update-profile`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: formData.username,
        date_of_birth: isoDate,
        gender: formData.gender,
        avatar_url: avatar,
        nationality: formData.nationality,
        age_range: formData.age_range
      }),
    });

    const result = await response.json();
    if (result) {
      console.log(result);
      toast.success("Cập nhật thông tin thành công");
      localStorage.setItem("avatar", avatar);
    } else {
      toast.error("Lỗi");
    }
  };

  const handleUpdate = () => navigate("/updatePassword");

  return (
    <>
      <Header />
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center pt-[100px] pb-[100px]" style={{ backgroundImage: "url(/bg/bg3.png)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
        <div className="w-[762px] bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl p-10">
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4" style={{ maxWidth: "150px" }}>
              <div className="w-[150px] h-[150px] rounded-full border-4 border-gray-300 bg-cover bg-center transition-all hover:border-green-600 hover:brightness-90" style={{ backgroundImage: `url('${avatar}')` }}></div>
              <input type="file" id="avatarInput" accept="image/*" onChange={handleAvatarChange} className="hidden" />
              <label htmlFor="avatarInput" className="absolute bottom-2 right-2 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center shadow cursor-pointer">
                <i className="fas fa-camera" />
              </label>
            </div>

            <h2 className="text-3xl font-bold text-gray-800">{formData.username}</h2>
            <p className="text-gray-500 text-sm">Là thành viên kể từ tháng 4 năm 2025</p>
          </div>

          <div className="space-y-5 text-base">
            <div>
              <label className="block mb-1">Họ và tên của bạn</label>
              <input name="username" value={formData.username} onChange={handleChange} className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-lg" />
            </div>

            <div>
              <label className="block mb-1">Email</label>
              <input type="email" value={formData.email} readOnly className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-lg" />
            </div>

            <div>
              <label className="block mb-1">Mật khẩu</label>
              <div className="relative flex">
                <input type={passwordVisible ? "text" : "password"} value="password" readOnly className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-lg pr-10" />
                <span onClick={() => setPasswordVisible(!passwordVisible)} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                  <i className={`far ${passwordVisible ? "fa-eye" : "fa-eye-slash"} text-gray-400`} />
                </span>
                <button className="bg-[#009951] text-white ml-[20px] w-[150px] rounded font-bold" onClick={handleUpdate}>Update</button>
              </div>
            </div>

            <div>
              <label className="block mb-1">Ngày sinh</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-lg" />
            </div>

            <div>
              <label className="block mb-1">Giới tính</label>
              <select value={formData.gender} name="gender" onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg">
                <option value="">-- Chọn giới tính --</option>
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
                <option value="Other">Khác</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">Quốc gia</label>
              <select name="nationality" value={formData.nationality} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg">
                <option value="">-- Chọn quốc gia --</option>
                {countryList.map((item, idx) => (
                  <option key={idx} value={item.name.common}>{item.name.common}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1">Nhóm tuổi</label>
              <select name="age_range" value={formData.age_range} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg">
                <option value="">-- Chọn nhóm tuổi --</option>
                <option value="student">10 đến 25 tuổi</option>
                <option value="non_student">Trên 25 tuổi</option>
              </select>
            </div>

            <div>
              <button onClick={handleClick} className="bg-[#009951] text-white p-[10px] ml-[40%] w-[100px] rounded font-bold">Xác nhận</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
