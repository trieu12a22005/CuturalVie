import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import AIAssistantModal from "../../components/AI/Assistance";
import TooltipText from "../../components/Game/TooltipText";
import { MessageSquare } from "lucide-react";
function getToolTiptext(paragraph, setChatdata) {
  let words = paragraph.split(" ");
  return words.map((word, idx) => (
    <TooltipText setModal={setChatdata} key={idx} text={word} />
  ));
}
const DetailMorePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item, relatedPosts } = location.state || {};
  let [open, setOpen] = useState(false);
    let [chatData, setChatdata] = useState(null);
  const paragraphStyles = {
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    display: '-webkit-box'
  }
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[])
  const handleReadMore = (post) => {
    const updatedPosts = relatedPosts ? [...relatedPosts.filter((related) => related.id !== post.id), item] : [item]
    navigate(`/detail-more`, { state: { item: post, relatedPosts: updatedPosts } }); 
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-cover bg-center bg-[url('/bg/bgHome.jpg')] text-white min-h-screen">
      <Header />
      <section className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-4xl font-bold text-white drop-shadow-md mb-2">KHƠI NGUỒN TRI THỨC</h1>
        <p className="text-white text-lg mb-8">
          Nơi cung cấp cho bạn những thông tin bổ ích về văn hóa, lịch sử và truyền thống của Việt Nam.
        </p>
        <h2 className="text-3xl font-semibold text-white mb-8">{item.title}</h2>
        <div className="max-w-4xl mx-auto bg-white shadow rounded-md p-6">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-auto rounded-md mb-4"
          />
          <p className="text-gray-800 text-lg">{getToolTiptext(item.content, setChatdata)}</p>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">Các bài đăng liên quan</h3>
          <div className="space-y-6">
            {relatedPosts?.map((post) => (
              <div
                key={post.id}
                className="max-w-4xl mx-auto bg-white shadow rounded-md p-6 flex gap-6 items-center"
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-40 h-32 object-cover rounded-md"
                />
                <div className="text-left">
                  <h4 className="text-black text-xl font-bold mb-2">{post.title}</h4>
                  <p className="text-black" style={paragraphStyles}>{post.content}</p>
                  <button
                    onClick={() => handleReadMore(post)} 
                    className="text-green-600 font-medium hover:underline"
                  >
                    Đọc thêm
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-4 right-4">
          <button
            onClick={() => navigate(-1)} // Quay lại trang trước
            className="bg-green-600 text-white px-6 py-2 rounded-full shadow hover:bg-green-700"
          >
            Quay về
          </button>
        </div>
      </section>
      <button
          className="fixed bottom-30 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition duration-300 flex items-center space-x-2"
          onClick={() => setOpen(!open)}
        >
          <MessageSquare className="w-6 h-6" />
          <span className="text-sm">Chat cùng AI</span>
        </button>
        <AIAssistantModal chatData={chatData} open={open} setOpen={setOpen} />
    </div>
  );
};

export default DetailMorePage;