import React from 'react'
import Header from '../../components/Header/Header'
import VietnamRegions from './Region'
import Community from './Community'
import Experience from './Experience'
import About from './About'
import FeedBack from './FeedBack'
import Hero from './Hero'
import Feature from './Feature'
import Footer from './Footer'

function Home() {
  return (
    <>
      <section className="relative bg-contain bg-repeat bg-center bg-[url('/bg/bg-home.jpg')]">
        <div className="absolute inset-0 bg-black opacity-60 z-0" />
        <div className="relative z-10">
          <Header />
          <Hero />
          <Feature />
          <VietnamRegions />
          <Community />
          <Experience />
          <About />
        </div>
      </section>
      <FeedBack />
      <Footer />
    </>
  )
}

export default Home
