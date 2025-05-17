import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../home/Footer";
import axiosInstance from "../../api/axios";

function History() {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    axiosInstance.get("/history/get-history").then((res) => {
      setHistoryData(res.data);
    });
  }, []);

  return (
    <>
      <Header />
      <div
        className="min-h-screen bg-cover bg-center flex items-start justify-center pt-20"
        style={{
          backgroundImage: "url(/bg/bg3.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md max-w-2xl w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">Lịch sử tìm hiểu</h2>
          {historyData.length === 0 ? (
            <p className="text-center text-gray-600">Chưa có lịch sử chơi nào.</p>
          ) : (
            <div className="space-y-4">
              {historyData.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-300 rounded-md p-4 bg-white"
                >
                  <p className="text-lg font-medium">{item.description}</p>
                  <p>
                    <span className="font-semibold">Thời gian bắt đầu:</span>{" "}
                    {new Date(item.started_time).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-semibold">Thời gian hoàn thành:</span>{" "}
                    {item.completed_time
                      ? new Date(item.completed_time).toLocaleString()
                      : "Chưa hoàn thành"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default History;
