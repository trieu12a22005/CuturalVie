import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Section from "./Section";
import Footer from '../home/Footer'
import Loader from '../../components/loading'
const Contact = () => {
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/section`)
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
        <Loader/>
      </div>
  )
  }
  return (
    <div className="bg-cover bg-center bg-[url('/bg/bgHome.jpg')]">
      <Header />
      <section className="text-center py-16 text-white min-h-[90vh]">
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