import React from 'react'
import { motion } from 'framer-motion'
function StartPuzzzle() {
  return (
        <section className=' relative h-full'>
          <motion.img
            src="/template/group5.png"
            alt=""
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
    
          <motion.img
            src="/items/food/img1.png"
            alt=""
            className="absolute bottom-1 left-1"
            initial={{ x: -50, y: 50, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
    
          <motion.img
            src="/items/food/img2.png"
            alt=""
            className="absolute right-1 top-1"
            initial={{ x: 50, y: -50, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
        </section>
  )
}

export default StartPuzzzle