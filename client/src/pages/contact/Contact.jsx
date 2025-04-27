import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Section from "./Section";
import Footer from '../home/Footer'

const Contact = () => {
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch('http://localhost:5000/api/v1/section/')
        const result = await response.json()
        if (Array.isArray(result)) {
          setSections(result);
          console.log(result);
          
        } else {
          console.error("API trả về dữ liệu không phải là mảng:", result);
          setSections([]);
        }
      } catch (error) {
        console.log("Error fetching data", error)
      }
      finally {
        setLoading(false)
      }

    }

    fetchData()
  }, [])

  if(loading) {
    return (
      <div className="bg-cover bg-center bg-[url('/bg/bgHome.jpg')] text-white">
        <Header/>
        <div className="text-white text-center py-20">Đang tải dữ liệu...</div>
      </div>
  )
  }
  return (
    <div className="bg-cover bg-center bg-[url('/bg/bgHome.jpg')]">
      <Header />
      <section className="text-center py-16 text-white">
        <h1 className="text-4xl font-bold mb-4">KHƠI NGUỒN TRI THỨC</h1>
        <p className="text-lg">
          Nơi cung cấp cho bạn những thông tin bổ ích về văn hóa, lịch sử và
          truyền thống của Việt Nam.
        </p>
        {sections.map((section, index) => (
          <Section key={index} title={section.title} items={section.items}/>
        ))}
      </section>
      <Footer />
    </div>
  );
};

export default Contact;