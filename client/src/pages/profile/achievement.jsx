import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../home/Footer"
function Achievement() {
  const [achiev, setAchiev] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/achievements/get-achievement-user-id`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log(data);
        setAchiev(data);
      } catch (error) {
        console.error("Lỗi khi fetch:", error);
      }
    }

    fetchData();
  }, []);
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center py-10 mt-[50px]" style={{
        backgroundImage: "url(/bg/bg3.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}>
        <div className="w-full max-w-3xl rounded-xl bg-white shadow-lg p-6 text-center" >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeJF7sVh67zp0MmU1w8UaRV9j_vZ0v9-ecYA&s"
            alt="Avatar"
            className="w-28 h-28 mx-auto rounded-full border-4 border-white shadow -mt-16 mb-2"
          />
          <h2 className="text-2xl font-bold">{localStorage.getItem("name")}</h2>
          <h3 className="text-2xl font-bold mb-4 text-black">
            BẢNG THÀNH TÍCH
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-black border-collapse">
              <thead>
                <tr className="bg-[#27174E] text-white border border-black">
                  <th className="py-2 px-4 border border-black">
                    Vùng văn hóa
                  </th>
                  <th className="py-2 px-4 border border-black">Ngôi sao</th>
                  <th className="py-2 px-4 border border-black">Huy hiệu</th>
                </tr>
              </thead>
              <tbody>
                {achiev.length > 0 ? (
                  achiev.map((region, index) => (
                    <tr key={index} className="">
                      <td className="py-2 px-4 bg-[#D0BCFF] border text-left font-bold">
                        {region.name}
                      </td>
                      <td className="py-2 px-4 text-yellow-500 border border-black  text-lg">
                        {"★".repeat(region.stars)}
                      </td>
                      <td className="py-2 px-4 border">
                        {region.stars == 3 ? (
                          <img
                            src={region.imageUrl}
                            alt={`badge-${index}`}
                            className="w-10 h-10 rounded-full mx-auto"
                          />
                        ) : null}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-4">
                      Đang tải dữ liệu...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-blue-800 font-medium text-sm">
              <img src="items/champion.png" alt="icon" className="w-5 h-5" />
              <p>
              Bạn là bậc thầy du lịch khi đã hoàn thành{" "}
                {achiev.filter((region) => region.stars == 3).length} chuyến đi
              </p>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Achievement;
