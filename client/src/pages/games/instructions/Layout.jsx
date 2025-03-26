import React from "react";
import { motion } from "framer-motion";
import MyLayout from '../../../components/Layout'
function Layout({children}) {
  return (
    <MyLayout url={"/bg/bg1.png"}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-lg shadow-lg w-[90vw] h-[90vh] relative"
      >
          {children}
      </motion.div>
    </MyLayout>
  );
}

export default Layout;
