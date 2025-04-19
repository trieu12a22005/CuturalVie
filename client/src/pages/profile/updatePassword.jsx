import { useState } from "react";
import toast from "react-hot-toast";
function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async () => {
    const response = await fetch(
      "https://viet-cultural-be.vercel.app/api/v1/users/update-password",
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword: oldPassword,
          newPassword: newPassword
        }),
      }
    );
  
    const result = await response.json();
    if (result)
    {
      toast.success("Cập nhật thông tin thành công")
    }
    else
    {
      toast.error("Lỗi")
    }
  };

  return (
    <div style={{
        backgroundImage: "url('bg/bg3.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh", // Chiếm toàn màn hình
        width: "100%",      // Chiều ngang đầy đủ
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div className="max-w-md mx-auto p-6 w-[762px] rounded-xl bg-white shadow-md space-y-5" >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Đổi mật khẩu
      </h2>

      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Mật khẩu hiện tại
        </label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Nhập mật khẩu cũ"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Mật khẩu mới
        </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Nhập mật khẩu mới"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-3 mt-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
      >
        Cập nhật
      </button>
    </div>
    </div>
  );
}

export default UpdatePassword;
