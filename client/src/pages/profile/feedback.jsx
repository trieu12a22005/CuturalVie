import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../home/Footer"
import toast from "react-hot-toast"
function FeedbackForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate()
  const handleClick = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/feedback`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        toast.success("Gửi phản hồi thành công!");
        setTitle("");
        setContent("");
        navigate("/home")
        // Optionally redirect
        // navigate("/home");
      } else {
        toast.error(data.message || "Gửi phản hồi thất bại!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Đã có lỗi xảy ra khi gửi phản hồi!");
    }
  };
  
  return (
    <>
      <Header />
      <div
      className="min-h-screen flex items-center justify-center py-10 px-4"
      style={{
        backgroundImage: "url(bg/bg3.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full max-w-xl  rounded-2xl bg-white shadow-md p-8">
        <div className="flex flex-col items-center mb-6">
          <img
            src={localStorage.getItem("avatar")}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md mb-2"
          />
          <h2 className="text-2xl font-bold">{localStorage.getItem("name")}</h2>
          <p className="text-gray-500">Là thành viên kể từ tháng 4 năm 2025</p>
          <h3 className="mt-2 text-[24px] text-green-600 font-bold">
            Ý kiến đóng góp
          </h3>
        </div>

        {/* Tiêu đề */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Tiêu đề</label>
          <input
            type="text"
            placeholder="Bài đăng của bạn về chủ đề gì?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Nội dung */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Nội dung</label>
          <textarea
            rows={5}
            placeholder="Bạn muốn chia sẻ điều gì?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
        </div>
        {/* Cảm ơn */}
        <p className="text-green-700 font-semibold text-center mb-4">
          VietCultural xin chân thành cảm ơn bạn!
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md" onClick={handleClick}>
            Gửi thư
          </button>
          <button className="bg-gray-200 text-gray-600 font-semibold px-6 py-2 rounded-md">
            <Link to={"/home"}>Hủy bỏ</Link>
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default FeedbackForm;
