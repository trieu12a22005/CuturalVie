const regions = [
  {
    name: "Đồng bằng Bắc Bộ",
    stars: 3,
    badge: "/images/huy-hieu1.png",
  },
  {
    name: "Tây Bắc",
    stars: 3,
    badge: "/images/huy-hieu2.png",
  },
  {
    name: "Việt Bắc",
    stars: 3,
    badge: "/images/huy-hieu3.png",
  },
  {
    name: "Bắc Bộ Trung Bộ và duyên hải Trung Bộ",
    stars: 3,
    badge: "/images/huy-hieu4.png",
  },
  {
    name: "Trường Sơn - Tây Nguyên",
    stars: 3,
    badge: "/images/huy-hieu5.png",
  },
  {
    name: "Nam Bộ",
    stars: 3,
    badge: "/images/huy-hieu6.png",
  },
];
function Achievement() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-10">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
          alt="Avatar"
          className="w-28 h-28 mx-auto rounded-full border-4 border-white shadow -mt-16 mb-2"
        />
        <h2 className="text-2xl font-bold">Lê Mẫn Nhi</h2>
        <p className="text-gray-500 mb-6">
          Là thành viên kể từ tháng 4 năm 2025
        </p>

        <h3 className="text-2xl font-bold mb-4 text-black">BẢNG THÀNH TÍCH</h3>

        <div className="overflow-x-auto">
          <table className="w-full border border-black border-collapse">
            <thead>
              <tr className="bg-[#27174E] text-white border border-black">
                <th className="py-2 px-4 border border-black">Vùng văn hóa</th>
                <th className="py-2 px-4 border border-black">Ngôi sao</th>
                <th className="py-2 px-4 border border-black">Huy hiệu</th>
              </tr>
            </thead>
            <tbody>
              {regions.map((region, index) => (
                <tr
                  key={index}
                  className= ""
                >
                  <td className="py-2 px-4 bg-[#D0BCFF] border text-left font-bold">
                    {region.name}
                  </td>
                  <td className="py-2 px-4 text-yellow-500 border border-black  text-lg">
                    {"★".repeat(region.stars)}
                  </td>
                  <td className="py-2 px-4 border">
                    <img
                      src={region.badge}
                      alt={`badge-${index}`}
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-blue-800 font-medium text-sm">
          <img src="items/champion.png" alt="icon" className="w-5 h-5" />
          <p>Bạn là bậc thầy du lịch khi đã hoàn thành 6 chuyến đi!</p>
        </div>
      </div>
    </div>
  );
}

export default Achievement;
