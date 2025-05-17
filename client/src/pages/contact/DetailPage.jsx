import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { ChevronLeft, ChevronRight} from "lucide-react";
import Loader from "../../components/loading";
import Unavaible from "./Unavaible";
import axiosInstance from "../../api/axios";

const paragraphStyles = {
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  display: '-webkit-box'
}
const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  let [loading,setLoading]=useState(false)
  const subject = location.state?.subject;
  
  useEffect(() => {
    if (!subject) {
      navigate("/contact");
      return;
    }

    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/knowledge-post/get-post?subject=${subject}&page=${currentPage}`
        );
        const result = await response.json();
        setData(result.posts);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
      finally {
        setLoading(false)
      }
    };

    fetchData();
  }, [subject, currentPage, navigate]);

  const handleReadMore = (item) => {
    const relatedPosts = data.filter((post) => post.id  !== item.id)
    axiosInstance.post('/history',{
      description: "tìm hiểu về "+item.title,
      completed: false
   })
    navigate(`/detail-more`, { state: {item, relatedPosts} })
  }
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }

  if (loading) {
    return <div className="bg-cover bg-center bg-[url('/bg/bgHome.jpg')] text-white min-h-screen">
      <Header tab={"/contact"} />
      <Loader/>
      </div>

  }

  if (!data || data.length === 0) {
    return <Unavaible/>;
  }

  return (
    <div className="bg-cover bg-center bg-[url('/bg/bgHome.jpg')] text-white min-h-screen">
      <Header tab={"/contact"} />
      <section className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-4xl font-bold text-white drop-shadow-md mb-2">
          KHƠI NGUỒN TRI THỨC
        </h1>
        <p className="text-white text-lg mb-8">
          Nơi cung cấp cho bạn những thông tin bổ ích về văn hóa, lịch sử và
          truyền thống của Việt Nam.
        </p>
        <h2 className="text-3xl font-semibold text-white mb-8">{subject}</h2>
        <div className="space-y-8">
          {data.map((item) => {
            
            return (
              <div
                key={item.id}
                className="max-w-4xl mx-auto bg-white shadow rounded-md p-6 flex gap-6 items-center"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-40 h-32 object-cover rounded-md"
                />
                <div className="text-left">
                  <h3 className="text-black text-xl font-bold mb-2">
                    {item.title}
                  </h3>
                  <p style={paragraphStyles} className="text-black transition-all">
                    {item.content}
                  </p>
                  <button
                    onClick={() => handleReadMore(item)}
                    className="text-green-600 font-medium"
                  >
                    Đọc thêm
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 hover:bg-gray-200 rounded"
          >
            <ChevronLeft size={20} />
          </button>
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${
                  page === currentPage
                    ? "bg-green-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )
          )}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 hover:bg-gray-200 rounded"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Back Button */}
        <div className="fixed bottom-30 right-4">
          <button
            onClick={() => navigate("/contact")}
            className="bg-green-600 text-white px-6 py-2 rounded-full shadow hover:bg-green-700"
          >
            Quay về
          </button>
        </div>
        
      </section>
    </div>
  ) 
};

export default DetailPage;
