import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../home/Footer";

const Report = () => {
  return (
    
    <div className="bg-cover bg-center bg-[url('/bg/bgHome.jpg')]">
        <Header/>
        
      <div className="max-w-3xl mx-auto bg-white bg-opacity-95 rounded-xl shadow-lg p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 text-center mb-6">Báo cáo hành trình “lớn”</h1>
        
        {/* I. Thông tin tổng quát */}
        <div className="mb-6">
          <h2 className="text-green-700 font-semibold mb-2">
            I. Thông tin tổng quát:
          </h2>
          <div className="ml-2 space-y-1">
            <div>
              <span className="font-semibold">Họ tên:</span> Lê Mẫn Nhi
            </div>
            <div>
              <span className="font-semibold">Thời gian tham gia:</span> Từ tháng 4 năm 2025
            </div>
            <div>
              <span className="font-semibold">Tổng điểm tích lũy:</span>
              <span className="ml-2 text-yellow-500 text-lg">⭐⭐⭐⭐⭐</span>
            </div>
          </div>
        </div>

        {/* II. So sánh hành trình */}
        <div className="mb-6">
          <h2 className="text-green-700 font-semibold mb-2">
            II. So sánh hành trình “lớn”:
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-green-300 rounded-lg text-sm md:text-base">
              <thead>
                <tr className="bg-green-100 text-green-800">
                  <th className="border border-green-300 px-2 py-2">Nội dung</th>
                  <th className="border border-green-300 px-2 py-2">Ban đầu</th>
                  <th className="border border-green-300 px-2 py-2">Hiện tại</th>
                  <th className="border border-green-300 px-2 py-2">Tiến bộ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-green-300 px-2 py-2">Mức hiểu biết chung</td>
                  <td className="border border-green-300 px-2 py-2">Tôi biết sơ sơ và đoán (Tôi đoán, tôi nhớ...)</td>
                  <td className="border border-green-300 px-2 py-2">Tôi hiểu rõ các nét tiêu biểu văn hóa</td>
                  <td className="border border-green-300 px-2 py-2">Tăng 2 bậc</td>
                </tr>
                <tr>
                  <td className="border border-green-300 px-2 py-2">Chủ đề quen thuộc</td>
                  <td className="border border-green-300 px-2 py-2">Lễ hội/ phong tục<br/>Trang phục truyền thống</td>
                  <td className="border border-green-300 px-2 py-2">Lễ hội/ phong tục<br/>Trang phục truyền thống<br/>Âm nhạc/ Ẩm thực</td>
                  <td className="border border-green-300 px-2 py-2">Hiểu thêm về âm nhạc/ ẩm thực</td>
                </tr>
                <tr>
                  <td className="border border-green-300 px-2 py-2">Phong cách học yêu thích</td>
                  <td className="border border-green-300 px-2 py-2">Chơi game nhẹ nhàng</td>
                  <td className="border border-green-300 px-2 py-2">Video / mô phỏng</td>
                  <td className="border border-green-300 px-2 py-2">Cá nhân hóa</td>
                </tr>
                <tr>
                  <td className="border border-green-300 px-2 py-2">Mức độ truyền đạt kiến thức</td>
                  <td className="border border-green-300 px-2 py-2"></td>
                  <td className="border border-green-300 px-2 py-2">Có, tôi có thể kể lại những điều thú vị</td>
                  <td className="border border-green-300 px-2 py-2">Bậc 4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* III. Kết quả kiến thức */}
        <div className="mb-6">
          <h2 className="text-green-700 font-semibold mb-2">
            III. Kết quả kiến thức thu thập được:
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-green-300 rounded-lg text-sm md:text-base">
              <thead>
                <tr className="bg-green-100 text-green-800">
                  <th className="border border-green-300 px-2 py-2">Vùng văn hóa</th>
                  <th className="border border-green-300 px-2 py-2">Mức độ hoàn thiện</th>
                  <th className="border border-green-300 px-2 py-2">Điểm test</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-green-300 px-2 py-2">Đồng bằng Bắc Bộ</td>
                  <td className="border border-green-300 px-2 py-2">Đã hoàn thành</td>
                  <td className="border border-green-300 px-2 py-2">2/3</td>
                </tr>
                <tr>
                  <td className="border border-green-300 px-2 py-2">Việt Bắc</td>
                  <td className="border border-green-300 px-2 py-2"></td>
                  <td className="border border-green-300 px-2 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-green-300 px-2 py-2">Tây Bắc</td>
                  <td className="border border-green-300 px-2 py-2"></td>
                  <td className="border border-green-300 px-2 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-green-300 px-2 py-2">Trường Sơn - Tây Nguyên</td>
                  <td className="border border-green-300 px-2 py-2"></td>
                  <td className="border border-green-300 px-2 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-green-300 px-2 py-2">Bắc Trung Bộ và duyên hải Trung Bộ</td>
                  <td className="border border-green-300 px-2 py-2"></td>
                  <td className="border border-green-300 px-2 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-green-300 px-2 py-2">Nam Bộ</td>
                  <td className="border border-green-300 px-2 py-2"></td>
                  <td className="border border-green-300 px-2 py-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* IV. Phản hồi cảm xúc */}
        <div className="mb-8">
          <h2 className="text-green-700 font-semibold mb-2">
            IV. Phản hồi cảm xúc:
          </h2>
          <div className="bg-green-50 border border-green-300 rounded-lg p-4 text-green-900 text-base">
            Cảm ơn VietCutural rất nhiều, qua hành trình vừa rồi đã cho tôi rất nhiều cảm xúc, tôi cảm thấy bản thân đã học được rất nhiều điều bổ ích, và đã có rất nhiều động lực để tiếp tục tìm hiểu sâu hơn về đất nước Việt Nam tươi đẹp của chúng ta.
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-2 rounded-full shadow transition">
            Tải báo cáo
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Report;