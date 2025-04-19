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
    <section className="bg-cover bg-center bg-[url('/bg/bg1.png')]">
        <Header/>
         <Hero/>
         <Feature/>
         <VietnamRegions/>
         <Community/>
         <Experience/>
         <About/>
    </section>
       <FeedBack/>
       <Footer/>
    </>
  )
}

export default Home