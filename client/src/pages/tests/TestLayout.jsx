import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../home/Footer";

function TestLayout({ children }) {
  return (
    <>
      <Header />
      <div
        className="min-h-screen bg-cover bg-center flex items-start  justify-center "
        style={{
          backgroundImage: "url(/bg/bg3.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {children}
      </div>
      <Footer />
    </>
  );
}

export default TestLayout;
