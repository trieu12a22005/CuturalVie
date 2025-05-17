import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../home/Footer";

function History() {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
   
     let storedHistory = [
        {
          startTime: "2025-05-17T10:00:00Z",
          endTime: "2025-05-17T10:05:00Z",
        },
      ];

    setHistoryData(storedHistory);
  }, []);

  return (
    <>
      <Header />
      
      <Footer />
    </>
  );
}

export default History;
